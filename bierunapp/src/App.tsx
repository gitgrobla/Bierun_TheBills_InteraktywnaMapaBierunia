import styles from "./App.module.scss";

import React, { useEffect, useRef, useState } from "react";

import Map from "./components/Map/Map";
import Box from "./Box";
import { investments, Investment } from "./datasets/investments";
import Sidebar from "./components/Sidebar/Sidebar";
import ModelViewer from "./ModelViewer";
import TopBar from "./components/TopBar/TopBar.tsx";

interface Coords {
  x: number;
  y: number;
  z: number;
}

function App() {
  const cameraRef = useRef<any>(null);
  const [mapPosition, setMapPosition] = useState([
    50.09324438901613, 19.09179381393147,
  ]);

  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0, z: 0 });

  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);

  const isInvestmentSelected = selectedInvestment !== null;

  const unselectInvestment = () => {
    settd(false);
    setSelectedInvestment(null);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Handle mouse down event here
    console.log(cameraRef.current?.position);
  };

  const [td, settd] = useState(false);

  const teleportCamera = () => {
    if (!selectedInvestment) return;
    console.log(cameraRef.current);
    cameraRef.current?.position.set(
      selectedInvestment.lookFrom[0],
      selectedInvestment.lookFrom[1],
      selectedInvestment.lookFrom[2]
    );
    cameraRef.current?.updateMatrixWorld();
    setCoords({
      x: selectedInvestment.lookAt[0],
      y: selectedInvestment.lookAt[1],
      z: selectedInvestment.lookAt[2],
    });
  };

  const handleToggleTD = () => {
    if (td) {
      settd(false);
    } else {
      settd(true);
      teleportCamera();
    }
  };

  return (
    <div className={styles.main}>
      <TopBar />
      <Sidebar
        setTD={settd}
        handleToggleID={handleToggleTD}
        TD={td}
        unselectInvestment={unselectInvestment}
        selectedInvestment={selectedInvestment}
        isInvestmentSelected={isInvestmentSelected}
      />

      <div className={td ? styles.non : styles.map_container}>
        <Map
          mapPosition={mapPosition}
          setSelectedInvestment={setSelectedInvestment}
          setMapPosition={setMapPosition}
          investments={investments}
        />
      </div>

      <div className={styles.canvas_container}>
        <ModelViewer
          teleportCamera={teleportCamera}
          ref={cameraRef}
          fbxPath="/NurserySchool.fbx"
          {...coords}
        />
      </div>

      {/* <button
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          zIndex: 100,
        }}
        onClick={teleportCamera}
      >
        sdasdasda
      </button>
      <div className={styles.canvas_container}>
        <ModelViewer
          teleportCamera={teleportCamera}
          ref={cameraRef}
          fbxPath="/bierun008.fbx"
          {...coords}
        />
      </div> */}
    </div>
  );
}

export default App;
