import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.tsx"
import { Html } from "./helpers/Html.ts"
import { Stage } from "./helpers/Stage.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="fixed">
      <App />
      <Html.Out />
    </div>
    <Stage />
  </React.StrictMode>,
)
