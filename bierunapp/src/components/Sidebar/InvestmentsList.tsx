import { useState } from "react";
import styles from "./Sidebar.module.scss";
import { investments, Investment } from "../../datasets/investments";
import InvestmentCard from "./InvestmentCard";

function InvestmentList({
  handleInvestmentSelection,
}: {
  handleInvestmentSelection: (investment: Investment) => void;
}) {
  const handleSelectInvestment = (investment: Investment) => {
    handleInvestmentSelection(investment);
  };

  return (
    <div className={styles.list_holder}>
      <div className={styles.topbar}>
        <div className={styles.nofinvestments}>
          <span style={{ fontWeight: "700" }}>
            {investments.length} inwestycje
          </span>{" "}
          w Bieruniu
        </div>
      </div>
      <div className={styles.investmentsContainer}>
        {investments.map((investment, i) => (
          <InvestmentCard
            onClick={() => handleSelectInvestment(investment)}
            investment={investment}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default InvestmentList;
