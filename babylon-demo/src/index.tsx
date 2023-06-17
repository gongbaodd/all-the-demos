import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";


const root = createRoot(document.getElementById("app") as HTMLDivElement);

root.render(<App />)

setTimeout(() => {

    // const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    // guiMenu.idealHeight = 720;

    // const startBtn = Button.CreateSimpleButton("start", "PLAY");
    // startBtn.width = 0.2;
    // startBtn.height = "40px"
    // startBtn.color = "white"
    // startBtn.top = "-14px"
    // startBtn.thickness = 0
    // startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM

    // guiMenu.addControl(startBtn);

}, 1000)


