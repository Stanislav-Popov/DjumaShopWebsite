/** @format */

import styles from "./button.module.css"

// variants: primary, secondary
// sizes: small, medium, large

export default function Button({
    children,
    onClick,
    disabled = false,
    size = "medium",
    variant = "primary",
    type = "button",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${styles[size]} ${styles[variant]}`}>
            {children}
        </button>
    )
}
