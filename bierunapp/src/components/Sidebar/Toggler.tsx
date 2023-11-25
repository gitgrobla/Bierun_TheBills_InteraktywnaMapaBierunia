import styles from "./Sidebar.module.scss";

export default function Toggler() {
  return (
    <div className={styles.togglerHolder}>
      <div>
        <img src="/svg/location_city_FILL1_wght400_GRAD0_opsz24.svg" />
        Inwestycje
      </div>
      <div>
        <img src="/svg/forum_FILL1_wght400_GRAD0_opsz24.svg" />
        Propozycje
      </div>
    </div>
  );
}
