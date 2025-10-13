/** @format */

import { useState } from "react"
import styles from "./searchInput.module.css"
import { CloseOutlined } from "@ant-design/icons"

export default function SearchInput({ placeholder = "Поиск...", onSearch }) {
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        const newValue = e.target.value
        setValue(newValue)
        onSearch(newValue)
    }

    const handleClear = () => {
        setValue("")
        onSearch("")
    }

    return (
        <div className={styles.searchBox}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={styles.searchInput}
            />

            {value && (
                <button className={styles.clearButton} onClick={handleClear}>
                    <CloseOutlined className={styles.clearIcon} />
                </button>
            )}
        </div>
    )
}
