import { FilesetResolver, ObjectDetector } from "@mediapipe/tasks-vision";

const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");

const objectDetector = await ObjectDetector.createFromOptions(vision, {
    baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite"
    },
    scoreThreshold: .5,
    runningMode: "IMAGE"
});

const image = document.getElementById("image") as HTMLImageElement;
const detections = objectDetector.detect(image);

console.log(detections);