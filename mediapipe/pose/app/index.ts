import { DrawingUtils, FilesetResolver, NormalizedLandmark, PoseLandmarker } from "@mediapipe/tasks-vision"
import { Vector3, MathUtils } from "three"

const button = document.getElementById("button")! as HTMLButtonElement
const video = document.getElementById("webcam")! as HTMLVideoElement
const output = document.getElementById("output")! as HTMLCanvasElement
const testImg = document.getElementById("test")! as HTMLImageElement
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

const RShoulderIndex = 11
const LShoulderIndex = 12
const RElbowIndex = 13
const LElbowIndex = 14
const RWristIndex = 15
const LWristIndex = 16

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

    // predictTestImg()
}

function predictTestImg() {
    if (null === poseLandmarker) {
        return;
    }

    const { landmarks } = poseLandmarker.detect(testImg)

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, output.width, output.height)

    landmarks.forEach(landmark => {

        const angles = getArmAngle(landmark)

        angles && console.log(angles[0], angles[1])

        drawingUtils.drawLandmarks(landmark, {
            fillColor: data => {
                return colors[data.index ?? 0]
            }
        })
        drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS)
    })

    canvasCtx.restore()

}

function getArmAngle(landmark: NormalizedLandmark[]) {
    if([landmark[RShoulderIndex], landmark[LShoulderIndex], landmark[RElbowIndex], landmark[LElbowIndex], landmark[RWristIndex], landmark[LWristIndex]].map(({ visibility }) => visibility > 0.99).includes(false)) {
        return null
    }

    const RShoulder = new Vector3(landmark[RShoulderIndex].x, landmark[RShoulderIndex].y, landmark[RShoulderIndex].z)
    const LShoulder = new Vector3(landmark[LShoulderIndex].x, landmark[LShoulderIndex].y, landmark[LShoulderIndex].z)
    const RElbow = new Vector3(landmark[RElbowIndex].x, landmark[RElbowIndex].y, landmark[RElbowIndex].z)
    const LElbow = new Vector3(landmark[LElbowIndex].x, landmark[LElbowIndex].y, landmark[LElbowIndex].z)
    const RWrist = new Vector3(landmark[RWristIndex].x, landmark[RWristIndex].y, landmark[RWristIndex].z)
    const LWrist = new Vector3(landmark[LWristIndex].x, landmark[LWristIndex].y, landmark[LWristIndex].z)

    const angleR = getAngle(RElbow, RShoulder , RWrist)
    const angleL = getAngle(LElbow, LShoulder , LWrist)
    return [angleR, angleL]
}

function getAngle(p0: Vector3, p1: Vector3, p2: Vector3) {
    const a = p2.clone().sub(p0)
    const b = p1.clone().sub(p0)
    const cos =  a.normalize().dot(b.normalize())
    const angle = Math.acos(cos)
    const rad = MathUtils.radToDeg(angle)
    return rad
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
                const angles = getArmAngle(landmark)

                angles && console.log(angles[0], angles[1])


                drawingUtils.drawLandmarks(landmark, {
                    radius: data => DrawingUtils.lerp(data.from!.z, -.15, .1, 5, 1),
                    fillColor: data => {
                        if (data.index) {
                            if (data.index > 10 && data.index < 17) {
                                return colors[1]
                            }
                        }
                        return colors[0]
                    }
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