import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.scss";

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

import Map from "./components/Map/Map";
import Box from "./Box";
import { investments, Investment } from "./datasets/investments";
import Sidebar from "./components/Sidebar/Sidebar";

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
  const cameraRef = useRef<any>(null);
  const [mapPosition, setMapPosition] = useState([
    50.09324438901613, 19.09179381393147,
  ]);

  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);

  const isInvestmentSelected = selectedInvestment !== null;

  const unselectInvestment = () => {
    setSelectedInvestment(null);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Handle mouse down event here
    console.log(cameraRef.current?.position);
  };

  const [td, settd] = useState(false);

  return (
    <div className={styles.main}>
      <Sidebar
        setTD={settd}
        TD={td}
        unselectInvestment={unselectInvestment}
        selectedInvestment={selectedInvestment}
        isInvestmentSelected={isInvestmentSelected}
      />
      <div className={styles.map_container}>
        <Map
          mapPosition={mapPosition}
          setSelectedInvestment={setSelectedInvestment}
          setMapPosition={setMapPosition}
          investments={investments}
        />
      </div>
      <div className={styles.canvas_container}>
        <Canvas shadows onMouseDown={handleMouseDown}>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 500]}
          />
          <ambientLight intensity={1} />
          <primitive object={obj} />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
