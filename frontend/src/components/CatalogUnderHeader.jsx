/** @format */
import { useContext } from "react"
import styles from "../styles/catalogUnderHeader.module.css"
import SortDropdown from "./SortDropdown/SortDropdown"
import { CatalogContext } from "../context/CatalogContext"

export default function CatalogUnderHeader() {
    const {count, sortType, setSortType} = useContext(CatalogContext)

    return (
        <div className={styles.underHeaderStyle}>
            <div className={styles.countBlock}>
                <p>
                    Выбрано товаров: <b>{count}</b>
                </p>
            </div>
            <div className={styles.sortBlock}>
                <SortDropdown value={sortType} onChange={setSortType}/>
            </div>
        </div>
    )
}
