import type { ReactNode } from "react";
import styles from "./Chip.module.css";

export function Chip({
  children,
  leftIcon,
  rightIcon,
  className,
  onClick
}: {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Tag: "button" | "span" = onClick ? "button" : "span";

  return (
    <Tag
      className={[styles.chip, onClick ? styles.clickable : "", className].filter(Boolean).join(" ")}
      onClick={onClick}
      {...(onClick ? { type: "button" as const } : {})}
    >
      {leftIcon ? <span className={styles.leftIcon}>{leftIcon}</span> : null}
      <span className={styles.label}>{children}</span>
      {rightIcon ? <span className={styles.rightIcon}>{rightIcon}</span> : null}
    </Tag>
  );
}

