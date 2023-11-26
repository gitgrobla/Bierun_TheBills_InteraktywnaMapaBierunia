import { Investment } from "../../datasets/investments";
import Rating from "./Rating";
import styles from "./Sidebar.module.scss";

function InvestmentCard({
  investment,
  key,
  onClick,
}: {
  investment: Investment;
  key: React.Key;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={styles.investmentCard_container}
      key={key}
    >
      <div
        style={{
          backgroundImage: `url(${investment.thumbnail})`,
        }}
        className={styles.investmentCard_thumbnail}
      ></div>

      <div className={styles.investmentCard_mainInfo}>
        <div className={styles.title}>{investment.name}</div>
        <div className={styles.subinfo}>
          <div>{investment.address.split(",")[0]}</div>
          <div>
            <Rating rating={investment.rating} />
          </div>
        </div>
      </div>

      <div className={styles.investmentCard_tags}>
        <div>
          <img src="/svg/person_FILL1_wght400_GRAD0_opsz24.svg"></img>
          {investment.author}{" "}
          {investment.author != "Urząd Miasta" ? (
            <img src="/svg/new_releases_FILL1_wght400_GRAD0_opsz24.svg" />
          ) : (
            <img src="/svg/account_balance_FILL1_wght400_GRAD0_opsz24.svg" />
          )}
        </div>
        <div>
          <img src="/svg/category_FILL1_wght400_GRAD0_opsz24.svg"></img>
          {investment.category}
        </div>
        <div>
          <img src="/svg/donut_small_FILL1_wght400_GRAD0_opsz24.svg"></img>
          {investment.status}
        </div>
      </div>
    </div>
  );
}

export default InvestmentCard;
