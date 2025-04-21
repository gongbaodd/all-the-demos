// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
    PoseLandmarker,
    FilesetResolver,
    DrawingUtils
  } from "@mediapipe/tasks-vision";
  
  const demosSection = document.getElementById("demos");
  
  let poseLandmarker: PoseLandmarker;
  let runningMode = "IMAGE";
  let enableWebcamButton: HTMLButtonElement;
  let webcamRunning: Boolean = false;
  const videoHeight = "360px";
  const videoWidth = "480px";

  
  // Before we can use PoseLandmarker class we must wait for it to finish
  // loading. Machine Learning models can be large and take a moment to
  // get everything needed to run.
  const createPoseLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    //   "https://storage.googleapis.com/mediapipe-assets/studio/prod/alkali.mediapipestudio_20250418_0657_RC00/vision_wasm_internal.wasm"
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `./pose_landmarker_lite.task`,
        delegate: "GPU"
      },
      runningMode: runningMode,
      numPoses: 1,
      outputSegmentationMasks: true,
    });
    demosSection.classList.remove("invisible");
  };
  createPoseLandmarker();
  
  /********************************************************************
  // Demo 2: Continuously grab image from webcam stream and detect it.
  ********************************************************************/
  
  const video = document.getElementById("webcam") as HTMLVideoElement;
  const canvasElement = document.getElementById(
    "output_canvas"
  ) as HTMLCanvasElement;
  const canvasCtx = canvasElement.getContext("2d");
  const drawingUtils = new DrawingUtils(canvasCtx);
  
  // Check if webcam access is supported.
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;
  
  // If webcam supported, add event listener to button for when user
  // wants to activate it.
  if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
  } else {
    console.warn("getUserMedia() is not supported by your browser");
  }
  
  // Enable the live webcam view and start detection.
  function enableCam(event) {
    if (!poseLandmarker) {
      console.log("Wait! poseLandmaker not loaded yet.");
      return;
    }
  
    if (webcamRunning === true) {
      webcamRunning = false;
      enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    } else {
      webcamRunning = true;
      enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    }
  
    // getUsermedia parameters.
    const constraints = {
      video: true
    };
  
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);
    });
  }
  
  let lastVideoTime = -1;
  async function predictWebcam() {
    canvasElement.style.height = videoHeight;
    video.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    video.style.width = videoWidth;
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await poseLandmarker.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      poseLandmarker.detectForVideo(video, startTimeMs, async (result) => {

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // console.log("Segmentation Masks:", result.segmentationMasks);


        for (const mask of result.segmentationMasks) {


            const existingLink = document.getElementById("debug-download-link");
if (!existingLink) {
    const blob = await mask.canvas.convertToBlob();
    const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.id = "debug-download-link";
  downloadLink.href = url;
  downloadLink.download = "debug_segmentation.png";
  downloadLink.innerText = "Download Segmentation Frame";
  downloadLink.style.position = "absolute";
  downloadLink.style.top = "10px";
  downloadLink.style.left = "10px";
  downloadLink.style.backgroundColor = "#fff";
  downloadLink.style.padding = "6px";
  document.body.appendChild(downloadLink);
}

            
            canvasCtx.drawImage(mask.canvas, 0, 0, canvasElement.width, canvasElement.height);
        
            // const imageData = canvasCtx.getImageData(0, 0, canvasElement.width, canvasElement.height);
            // const data = imageData.data;
        
            // for (let i = 0; i < data.length; i += 4) {
            //   if (data[i + 3] > 0) {
            //     data[i] = 0;
            //     data[i + 1] = 0;
            //     data[i + 2] = 255;
            //     data[i + 3] = 100;
            //   }
            // }
        
            // canvasCtx.putImageData(imageData, 0, 0);
          }



        for (const landmark of result.landmarks) {
          drawingUtils.drawLandmarks(landmark, {
            radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1)
          });
          drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
        }
        canvasCtx.restore();



        
      });
    }
  
    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }