import type { ReactNode, CSSProperties } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "secondary" | "brand";
type ButtonSize = "xs" | "m" | "xl";

export function Button({
  variant,
  size = "xs",
  leftIcon,
  children,
  className,
  onClick,
  style
}: {
  variant: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  return (
    <button className={[styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ")} type="button" onClick={onClick} style={style}>
      {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
      {children}
    </button>
  );
}

