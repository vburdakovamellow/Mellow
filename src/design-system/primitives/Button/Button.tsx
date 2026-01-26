import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "secondary" | "brand";

export function Button({
  variant,
  leftIcon,
  children,
  className,
  onClick,
  type = "button"
}: {
  variant: ButtonVariant;
  leftIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button className={[styles.button, styles[variant], className].filter(Boolean).join(" ")} type={type} onClick={onClick}>
      {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
      {children}
    </button>
  );
}

