import styles from "./RadioCard.module.css";

export function RadioCard({ label, active = false, className }: { label: string; active?: boolean; className?: string }) {
  return (
    <div className={[styles.card, active ? styles.cardActive : "", className].filter(Boolean).join(" ")}>
      <div className={[styles.radio, active ? styles.radioActive : ""].filter(Boolean).join(" ")}>
        {active ? <div className={styles.radioDot} /> : null}
      </div>
      <p className={styles.title}>{label}</p>
    </div>
  );
}

