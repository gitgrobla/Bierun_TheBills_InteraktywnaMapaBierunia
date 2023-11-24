import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, Camera } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useCamera } from "@react-three/drei";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";

import Box from "./Box";

function App() {
  // const obj = useLoader(OBJLoader, "/Bierun003.obj");
  //  const obj = useLoader(FBXLoader, "/Bierun001.fbx");
  // const obj = useLoader(FBXLoader, "/house.fbx");
  const obj = useLoader(FBXLoader, "/house.fbx");

  return (
    <div className="main">
      
      <Canvas
        shadows
      >
        <PerspectiveCamera makeDefault position={[0, 0, 500]} />
        <ambientLight intensity={1} />
        <primitive object={obj} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
