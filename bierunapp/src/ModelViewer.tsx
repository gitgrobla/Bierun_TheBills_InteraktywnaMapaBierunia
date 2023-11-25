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
  teleportCamera: () => void;
};

const ModelViewer = forwardRef((props: Props, ref: any) => {
  const { x, y, z, teleportCamera } = props;

  useEffect(() => {
    teleportCamera();
  }, [ref.current]);

  const obj = useLoader(FBXLoader, props.fbxPath);
  console.log(ref);
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault ref={ref} near={0.1} far={100000} />
      <ambientLight intensity={10} />
      <mesh>
        <primitive object={obj} />
        <primitive object={new GridHelper(1000, 100)} />
        <primitive object={new AxesHelper(500)} />
      </mesh>
      <MapControls makeDefault target={new THREE.Vector3(x, y, z)} />
    </Canvas>
  );
});

export default ModelViewer;
