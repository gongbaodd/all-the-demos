import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

const root = createRoot(document.getElementById("app") as HTMLDivElement);

root.render(<App/>)


// import "@babylonjs/core/Debug/debugLayer"
// import "@babylonjs/inspector"
// import "@babylonjs/loaders/glTF"
// import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, Vector3 } from "@babylonjs/core"

// enum State {
//     START = 0,
//     GAME = 1,
//     LOSE = 2,
//     CUTSCENE = 3
// }

// class App1 {

//     constructor() {
//         const canvas = document.createElement("canvas")
//         canvas.style.width = "100%"
//         canvas.style.height = "100%"
//         canvas.id = "gameCanvas"
//         document.body.appendChild(canvas)

//         const engine = new Engine(canvas, true)
//         const scene = new Scene(engine)

//         const camera = new ArcRotateCamera("Camera", Math.PI/2, Math.PI/2, 2, Vector3.Zero(), scene)
//         camera.attachControl(canvas, true)

//         const light1 = new HemisphericLight("light1", new Vector3(1,1,0), scene)
//         const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene)

//         window.addEventListener("keydown", ev => {
//             if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "i") {
//                 if (scene.debugLayer.isVisible()) {
//                     scene.debugLayer.hide()
//                 } else {
//                     scene.debugLayer.show()
//                 }
//             }
//         })

//         engine.runRenderLoop(() => scene.render())
        
//     }
// }

// new App1()
