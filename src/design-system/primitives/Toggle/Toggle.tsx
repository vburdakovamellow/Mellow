import styles from "./Toggle.module.css";

export function Toggle({
  on = false,
  className,
  onToggle
}: {
  on?: boolean;
  className?: string;
  onToggle?: (next: boolean) => void;
}) {
  return (
    <button
      aria-pressed={on}
      className={[styles.toggle, on ? styles.on : "", className].filter(Boolean).join(" ")}
      type="button"
      onClick={() => onToggle?.(!on)}
    >
      <span className={styles.indicator} />
    </button>
  );
}

