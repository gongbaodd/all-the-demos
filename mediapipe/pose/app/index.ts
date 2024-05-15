import { DrawingUtils, FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision"

const button = document.getElementById("button")! as HTMLButtonElement
const video = document.getElementById("webcam")! as HTMLVideoElement
const output = document.getElementById("output")! as HTMLCanvasElement
const canvasCtx = output.getContext("2d")!
const drawingUtils = new DrawingUtils(canvasCtx)
let webCamRunning = false
let lastVideoTime = -1
let poseLandmarker: PoseLandmarker | null = null


if (hasGetUserMedia()) {
    console.log("button is ready")
    button.addEventListener("click", enableCam)
    init()
} else {
    console.warn("getUserMedia() is not supported byt your browser")
}

async function init() {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm")

    poseLandmarker = await PoseLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath: "./model/pose_landmarker_lite.task"
            },
            runningMode: "VIDEO"
        }
    )
}

function hasGetUserMedia() {
    return !!navigator.mediaDevices?.getUserMedia
}

function enableCam(event: MouseEvent) {
    if (!poseLandmarker){
        console.warn("Wating poselandmarker to load")
        return;
    }    

    if (true === webCamRunning) {
        webCamRunning = false
        button.innerText = "ENABLE PREDICTIONS"
    } else {
        webCamRunning = true
        button.innerText = "DISABLE PREDICTIONS"
    }

    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream
        video.addEventListener('loadeddata', predictWebCam)
    })
    
}

function predictWebCam() {
    if (null === poseLandmarker) {
        return;
    }

    let startTimeMs = performance.now()

    if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime
        poseLandmarker.detectForVideo(video, startTimeMs, result => {
            canvasCtx.save()
            canvasCtx.clearRect(0, 0, output.width, output.height)

            for(const landmark of result.landmarks) {
                drawingUtils.drawLandmarks(landmark, {
                    radius: data => DrawingUtils.lerp(data.from!.z, -.15, .1, 5, 1)
                })

                drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS)
            }

            canvasCtx.restore()
        })
    }
    
    if (true === webCamRunning) {
        window.requestAnimationFrame(predictWebCam)
    }
}