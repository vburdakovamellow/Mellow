import type { ReactNode } from "react";
import styles from "./Chip.module.css";

export function Chip({
  children,
  leftIcon,
  rightIcon,
  className
}: {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}) {
  return (
    <span className={[styles.chip, className].filter(Boolean).join(" ")}>
      {leftIcon ? <span className={styles.leftIcon}>{leftIcon}</span> : null}
      <span className={styles.label}>{children}</span>
      {rightIcon ? <span className={styles.rightIcon}>{rightIcon}</span> : null}
    </span>
  );
}

