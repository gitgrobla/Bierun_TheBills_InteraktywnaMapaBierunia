import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Box,
  OrbitControls,
  useTexture,
  Text,
  PerspectiveCamera,
  Grid,
  useCamera,
  FlyControls,
  MapControls,
  Stage,
  OrthographicCamera,
} from "@react-three/drei";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { AxesHelper, GridHelper } from "three";

import styles from "./App.module.scss";

type Props = {
  x: number;
  y: number;
  z: number;
  fbxPath: string;
};


export default function ModelViewer(props: Props) {
  const [coords,setCoords] = useState({x: props.x, y: props.y,z: props.z});
  
  const obj = useLoader(FBXLoader, props.fbxPath);
  const cameraRef= useRef<THREE.PerspectiveCamera>(null!);
  return (
    <>
      <div className={styles.main}>
        <Canvas shadows>
          <PerspectiveCamera near={10} far={10000} />
          <ambientLight intensity={10} />
          <mesh >

            <primitive object={obj} />
            <primitive object={new GridHelper(1000, 100)} />
            <primitive object={new AxesHelper(500)} />
          </mesh>
          <MapControls
          target={new THREE.Vector3(coords.x, coords.y, coords.z)}
    
          />
        </Canvas>
      </div>
    </>
  );
}
