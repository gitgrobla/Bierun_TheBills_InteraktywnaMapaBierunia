import React, { useState } from "react";

type Props = {};

import styles from "./ContextMenu.module.scss";

function ContextMenu({}: Props) {

    const [visible,setVisible] = useState(true);
  return (
    <>
    <div className={`${styles.contextMenu} ${!visible?styles.hidden:""}`}>
      <div>
        <img src="/svg/location_city_FILL1_wght400_GRAD0_opsz24.svg" alt="plus" />
        Dodaj inwestycję</div>
      <div>
      <img src="/svg/forum_FILL1_wght400_GRAD0_opsz24.svg" alt="plus" />
        Dodaj propozycje</div>
      <div>
      <img src="/svg/Obserwowane_inwestycje_ICON.svg" alt="plus" />
        Obserwowane inwestycje</div>
      <div>
      <img src="/svg/ObserwowanePropozycjeFuzjaIcon.svg" alt="plus" />
        Obserwowane propozycje</div>
    </div>
    <div onClick={() => setVisible(visible => !visible)} className={`${styles.hideCircle} ${!visible?styles.hidden:""}`}>

      <img src="/svg/expand_less_FILL1_wght400_GRAD0_opsz24.svg" alt="plus" style={{display: visible?"block":"none"}} />
      <img src="/svg/expand_more_FILL1_wght400_GRAD0_opsz24_2.svg" alt="plus" style={{display:visible?"none":"block"}} />
    </div>
    </>

  );
}

export default ContextMenu;
