import { StrictMode } from "react"
import {createRoot} from "react-dom/client"
import { App } from "./App"
import "@babylonjs/materials";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
