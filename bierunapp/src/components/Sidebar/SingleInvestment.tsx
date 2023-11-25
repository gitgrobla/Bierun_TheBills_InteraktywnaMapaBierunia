import styles from "./Sidebar.module.scss";
function SingleInvestment({
  handleToggleID,
  unselectInvestment,
}: {
  handleToggleID: () => void;
  unselectInvestment: () => void;
}) {
  return (
    <div className={styles.singleInvestment}>
      <img
        onClick={unselectInvestment}
        className={styles.exit}
        src="/svg/expand_less_FILL1_wght400_GRAD0_opsz24.svg"
      />
     
        <img src='/zlobek_mockup.png' />

   
      <div className={styles.buttons}>
        <div className={styles.button}>
          <img src="/svg/change_circle_FILL1_wght400_GRAD0_opsz24.svg" />
          Zaproponuj inne miejsce
        </div>
        <div onClick={handleToggleID} className={styles.button}>
          <img src="/svg/3d_rotation_FILL1_wght400_GRAD0_opsz24_1.svg" />
          Zobacz model w widoku 3D
        </div>
      </div>
    </div>
  );
}

export default SingleInvestment;
