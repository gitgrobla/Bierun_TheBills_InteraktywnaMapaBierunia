import React, {
  useState,
  useRef,
  Suspense,
  useEffect,
  forwardRef,
} from "react";
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
  Sky,
} from "@react-three/drei";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { AxesHelper, CubeTextureLoader, GridHelper } from "three";

import styles from "./App.module.scss";

type Props = {
  x: number;
  y: number;
  z: number;
  fbxPath: string;
  teleportCamera: () => void;
};

const ModelViewer = forwardRef((props: Props, ref: any) => {
  const { x, y, z } = props;



  const obj = useLoader(FBXLoader, props.fbxPath);
  console.log(ref);
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault ref={ref} near={0.1} far={10000} />
      <ambientLight intensity={4} />
      <mesh>
        <primitive
          onClick={(e: any) => {
            console.log(e);
          }}
          object={obj}
        />
        <primitive object={new GridHelper(1000, 100)} />
        <primitive object={new AxesHelper(500)} />
      </mesh>
      <MapControls makeDefault target={new THREE.Vector3(x, y, z)} />
      <Sky
             distance={450000}
             sunPosition={[5, 1, 8]}
             inclination={0}
             azimuth={0}
             {...props}
         />
    </Canvas>
  );
});

export default ModelViewer;
