import React, { useState } from "react";

type Props = {};

import styles from "./ContextMenu.module.scss";

function ContextMenu({}: Props) {

    const [visible,setVisible] = useState(true);
  return (
    <>
    <div className={`${styles.contextMenu} ${!visible?styles.hidden:""}`}>
      <div>Dodaj inwestycję</div>
      <div>Dodaj propozycje</div>
      <div>Obserwowane inwestycje</div>
      <div>Obserwowane propozycje</div>
    </div>
    <div onClick={() => setVisible(visible => !visible)} className={`${styles.hideCircle} ${!visible?styles.hidden:""}`}></div>
    </>

  );
}

export default ContextMenu;
