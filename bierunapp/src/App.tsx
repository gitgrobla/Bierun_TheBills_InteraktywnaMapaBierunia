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
import ModelViewer from "./ModelViewer";

interface Coords {
  x: number;
  y: number;
  z: number;
}

function App() {
  // const obj = useLoader(OBJLoader, "/Bierun003.obj");
  //  const obj = useLoader(FBXLoader, "/Bierun001.fbx");
  const guideline = useLoader(FBXLoader, "/guidelines2.fbx");
  const obj = useLoader(FBXLoader, "/bierun008.fbx");
  const cameraRef = useRef<any>(null);
  const [mapPosition, setMapPosition] = useState([
    50.09324438901613, 19.09179381393147,
  ]);

  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0, z: 0 });

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
      {/* <Sidebar
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
      </div> */}
      <div
        style={{
          position: "absolute",
          zIndex: 100,
        }}
      >
        <button onClick={() => setCoords({ x: 0, y: 1000, z: 0 })}>cipa</button>
      </div>
      <div className={styles.canvas_container}>
        <ModelViewer fbxPath="/bierun008.fbx" {...coords} />
      </div>
    </div>
  );
}

export default App;
