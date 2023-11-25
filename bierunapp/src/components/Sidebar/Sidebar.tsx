import { useState } from "react";
import styles from "./Sidebar.module.scss";
import classnames from "classnames";
import { Investment } from "../../datasets/investments";
import InvestmentList from "./InvestmentsList";
import Toggler from "./Toggler";

function Sidebar({
  isInvestmentSelected,
  selectedInvestment,
  unselectInvestment,
  handleInvestmentSelection,
  setTD,
  TD,
  handleToggleID,
  sidebar,
  setSidebar,
}: {
  isInvestmentSelected: boolean;
  selectedInvestment: Investment | null;
  handleInvestmentSelection: (investment: Investment) => void;
  unselectInvestment: () => void;
  setTD: React.Dispatch<React.SetStateAction<boolean>>;
  TD: boolean;
  handleToggleID: () => void;

  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={
        !sidebar
          ? styles.sidebar
          : classnames(styles.sidebar, styles.sidebar_animaion)
      }
    >
      <Toggler />
      {!isInvestmentSelected ? (
        <InvestmentList handleInvestmentSelection={handleInvestmentSelection} />
      ) : (
        <>
          {" "}
          <button onClick={handleToggleID}>{!TD ? "[]" : "X"}</button>
          <button onClick={unselectInvestment}>X</button>
        </>
      )}
    </div>
  );
}

export default Sidebar;
