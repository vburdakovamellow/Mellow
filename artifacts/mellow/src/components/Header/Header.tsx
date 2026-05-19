import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.fixedHeader}>
      <div className={[styles.container, styles.headerInner].join(" ")}>
        <div className={styles.headerRow}>
          <div className={styles.logo}>
            mellow
          </div>
        </div>
      </div>
    </div>
  );
}
