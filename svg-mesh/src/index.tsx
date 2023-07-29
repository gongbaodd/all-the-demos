import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
// @ts-ignore
import * as SPECTOR from "spectorjs"

const spector = new SPECTOR.Spector()
spector.displayUI()

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
)