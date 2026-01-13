import styles from "./Toggle.module.css";

export function Toggle({ on = false, className }: { on?: boolean; className?: string }) {
  return (
    <button
      aria-pressed={on}
      className={[styles.toggle, on ? styles.on : "", className].filter(Boolean).join(" ")}
      type="button"
    >
      <span className={styles.indicator} />
    </button>
  );
}

