import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

import Box from "./Box";

function App() {
  const obj = useLoader(OBJLoader, "/Bierun003.obj");

  return (
    <div className="main">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <primitive object={obj} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
