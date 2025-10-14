/** @format */

import { useState } from "react"
import styles from "./searchInput.module.css"
import { CloseOutlined, SearchOutlined } from "@ant-design/icons"

export default function SearchInput({ placeholder = "Поиск...", onSearch, height="32px" }) {
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

    const handleSearchClick = () => {
        onSearch(value)
    }

    return (
        <div className={styles.searchBox}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={styles.searchInput}
                style={{height: height}}
            />

            {value && (
                <button className={styles.clearButton} onClick={handleClear}>
                    <CloseOutlined className={styles.clearIcon} />
                </button>
            )}

            <button
                className={styles.searchButton}
                onClick={handleSearchClick}
            >
                <SearchOutlined className={styles.searchIcon}></SearchOutlined>
            </button>
        </div>
    )
}
