import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

const el = document.getElementById("root") as HTMLElement
createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>
)
