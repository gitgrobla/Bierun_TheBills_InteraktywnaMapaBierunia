import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ModelViewer from "./ModelViewer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModelViewer x={0} y={10} z={0}
      fbxPath="/bierun008.fbx"
    />
  </React.StrictMode>
);
