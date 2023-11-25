import { useState } from "react";
import styles from "./Sidebar.module.scss";
import classnames from "classnames";
import { Investment } from "../../datasets/investments";

function Sidebar({
  isInvestmentSelected,
  selectedInvestment,
  unselectInvestment,
  setTD,
  TD,
}: {
  isInvestmentSelected: boolean;
  selectedInvestment: Investment | null;
  unselectInvestment: () => void;
  setTD: React.Dispatch<React.SetStateAction<boolean>>;
  TD: boolean;
}) {
  return (
    <div
      className={
        !isInvestmentSelected
          ? styles.sidebar
          : classnames(styles.sidebar, styles.sidebar_animaion)
      }
    >
      <button onClick={() => setTD(!TD)}>{!TD ? "[]" : "X"}</button>
      <button onClick={unselectInvestment}>X</button>
    </div>
  );
}

export default Sidebar;
