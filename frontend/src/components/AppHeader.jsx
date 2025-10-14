/** @format */

import styles from "../styles/AppHeader.module.css"
import SearchInput from "./SearchInput/SearchInput"
import { NavLink } from "react-router-dom"

export default function AppHeader() {
    function handleSearch(value) {
        console.log(value)
    }

    return (
        <header className={styles.headerStyle}>
            <div className={styles.logoSearchBlock}>
                <NavLink className={styles.logo} to="/">
                    DjumaShop
                </NavLink>

                <div className={styles.searchWrapper}>
                    <SearchInput placeholder="Поиск товаров..." onSearch={handleSearch} height="40px" />
                </div>
            </div>

            <nav className={styles.navButtonsBlock}>
                <NavLink className={styles.navButton} to="/">
                    Главная
                </NavLink>
                <NavLink className={styles.navButton + " " + styles.active} to="/catalog">
                    Каталог
                </NavLink>
                <NavLink className={styles.navButton} to="/about">
                    О нас
                </NavLink>
            </nav>
        </header>
    )
}
