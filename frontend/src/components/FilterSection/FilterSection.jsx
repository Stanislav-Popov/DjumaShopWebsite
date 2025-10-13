/** @format */

import { useState, useRef, useEffect } from "react"
import styles from "./filterSection.module.css"
import { DownOutlined } from "@ant-design/icons"

export default function FilterSection({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen)
    const [height, setHeight] = useState("0px")
    const contentRef = useRef(null)

    useEffect(() => {
        if (contentRef.current) {
            if (open) {
                setHeight(`${contentRef.current.scrollHeight}px`)
            } else {
                setHeight("0px")
            }
        }
    }, [open])

    return (
        <div className={!open ? styles.border : ""}>
            <button className={styles.sectionHeader} onClick={() => setOpen((prev) => !prev)}>
                <span>{title}</span>
                <DownOutlined className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`} />
            </button>

            <div
                ref={contentRef}
                className={`${styles.animatedWrapper} ${open ? styles.open : ""}`}
                style={{ maxHeight: height }}>
                <div className={styles.sectionContent}>{children}</div>
            </div>
        </div>
    )
}
