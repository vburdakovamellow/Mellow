import styles from "./RadioCard.module.css";

export function RadioCard({
  label,
  active = false,
  className,
  onSelect
}: {
  label: string;
  active?: boolean;
  className?: string;
  onSelect?: () => void;
}) {
  return (
    <button
      className={[styles.card, active ? styles.cardActive : "", className].filter(Boolean).join(" ")}
      type="button"
      onClick={onSelect}
    >
      <div className={[styles.radio, active ? styles.radioActive : ""].filter(Boolean).join(" ")}>
        {active ? <div className={styles.radioDot} /> : null}
      </div>
      <p className={styles.title}>{label}</p>
    </button>
  );
}

