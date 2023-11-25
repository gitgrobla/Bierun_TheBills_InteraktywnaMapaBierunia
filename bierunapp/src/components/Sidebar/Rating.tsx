import styles from "./Sidebar.module.scss";

export default function Rating({ rating }: { rating: number }) {
  return (
    <div className={styles.rating}>
      <img
        className={styles.minus}
        src="/svg/remove_FILL1_wght400_GRAD0_opsz24.svg"
      />
      <span>{rating}</span>
      <img
        className={styles.plus}
        src="/svg/add_FILL1_wght400_GRAD0_opsz24_2.svg"
      />
    </div>
  );
}
