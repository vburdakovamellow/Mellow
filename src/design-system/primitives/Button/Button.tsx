import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "secondary" | "brand";
type ButtonSize = "xs" | "m" | "xl";

export function Button({
  variant,
  size = "xs",
  leftIcon,
  children,
  className,
  onClick
}: {
  variant: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button className={[styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ")} type="button" onClick={onClick}>
      {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
      {children}
    </button>
  );
}

