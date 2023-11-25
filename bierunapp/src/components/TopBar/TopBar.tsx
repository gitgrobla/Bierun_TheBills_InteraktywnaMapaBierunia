import React from "react";

type Props = {};

import styles from "./TopBar.module.scss";
import SearchBar from "./SearchBar";
import ContextMenu from "./ContextMenu";

function TopBar({}: Props) {
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <img src="svg/Logo.svg" />
        <span>Interaktywna mapa Bielunia</span>
      </div>
      <div className={styles.center}>
        <button className={styles.selected} >Prosty</button>
        <button>Zaawansowany</button>
        <button>Społecznościowy</button>
      </div>
      <div className={styles.right}>
        <SearchBar />
        
        <img src="svg/notifications_FILL1_wght400_GRAD0_opsz24.svg" />
        <img src="svg/face_FILL1_wght400_GRAD0_opsz24_2.svg" />
      </div>
        <ContextMenu />
    </div>
  );
}

export default TopBar;
