import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, Camera } from "@react-three/fiber";
import {
  FlyControls,
  OrbitControls,
  PerspectiveCamera,
  useCamera,
} from "@react-three/drei";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";

import Box from "./Box";
import { Scene, WebGLRenderer } from "three";

type Props = {
  x: number;
  y: number;
  z: number;
  xScale: number;
  yScale: number;
  zScale: number;
  xRotation: number;
  yRotation: number;
  zRotation: number;
};

function App(props: Props) {
  // const obj = useLoader(OBJLoader, "/Bierun003.obj");
  //  const obj = useLoader(FBXLoader, "/Bierun001.fbx");
  // const obj = useLoader(FBXLoader, "/house.fbx");
  const obj = useLoader(FBXLoader, "/house.fbx");
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Handle mouse down event here
    console.log(cameraRef.current?.position);
  };

  const onAfterRender = (camera: any) => {
    (camera as THREE.PerspectiveCamera).rotateX(1);
    (camera as THREE.PerspectiveCamera).rotateY(0.1);
    (camera as THREE.PerspectiveCamera).rotateZ(0.1);
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  };

  return (
    <div className="main">
      <Canvas shadows onMouseDown={handleMouseDown}>
        <PerspectiveCamera
          ref={cameraRef}
          onAfterRender={onAfterRender}
          makeDefault
          position={[0, 0, 500]}
        />
        <ambientLight intensity={1} />
        <primitive object={obj} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
