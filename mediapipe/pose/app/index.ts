import { DrawingUtils, FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision"

const button = document.getElementById("button")! as HTMLButtonElement
const video = document.getElementById("webcam")! as HTMLVideoElement
const output = document.getElementById("output")! as HTMLCanvasElement
const canvasCtx = output.getContext("2d")!
const drawingUtils = new DrawingUtils(canvasCtx)
let webCamRunning = false
let lastVideoTime = -1
let poseLandmarker: PoseLandmarker | null = null

const colors =  [
"#FF5733",/* Pomegranate */
"#33FF57",/* UFO Green */
"#3357FF",/* Azure Radiance */
"#57FF33",/* Harlequin */
"#FF33F6",/* Hollywood Cerise */
"#33FFF6",/* Cyan/Aqua */
"#F633FF",/* Electric Violet */
"#33F6FF",/* Vivid Sky Blue */
"#FF8333",/* Neon Carrot */
"#33FF83",/* Mountain Meadow */
"#8333FF",/* Amethyst */
"#FF3333",/* Red Orange */
"#33FF3A",/* Malachite */
"#3A33FF",/* Han Purple */
"#FF3A33",/* Outrageous Orange */
"#3AFF33",/* Screamin' Green */
"#33FF8B",/* Malachite */
"#8B33FF",/* Electric Indigo */
"#FF8B33",/* Neon Carrot */
"#33FFD5",/* Medium Turquoise */
"#D533FF",/* Electric Purple */
"#33D5FF",/* Picton Blue */
"#FFD533",/* Supernova */
"#33FFDA",/* Medium Aquamarine */
"#DA33FF",/* Heliotrope */
"#33DAFF",/* Summer Sky */
"#FFDA33",/* Selective Yellow */
"#33FFDE",/* Turquoise */
"#DE33FF",/* Electric Purple */
"#33DEFF",/* Dodger Blue */
"#FFDE33",/* Dandelion */
"#33FFE2",/* Medium Turquoise */
"#E233FF",/* Heliotrope */
]


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

function enableCam(_event: MouseEvent) {
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

            result.landmarks.forEach((landmark, i) => {
                drawingUtils.drawLandmarks(landmark, {
                    radius: data => DrawingUtils.lerp(data.from!.z, -.15, .1, 5, 1),
                    color: colors[i]
                })
                drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS)
            })

            canvasCtx.restore()
        })
    }
    
    if (true === webCamRunning) {
        window.requestAnimationFrame(predictWebCam)
    }
}