/** @format */

import styles from "../styles/AppHeader.module.css"
import SearchInput from "./SearchInput/SearchInput"

function handleSearch(value) {
    console.log(value)
}

export default function AppHeader() {
    return (
        <header className={styles.headerStyle}>
            <div className={styles.logoSearchBlock}>
                <a className={styles.logo} href="">
                    DjumaShop
                </a>

                <div className={styles.searchWrapper}>
                    <SearchInput placeholder="Поиск товаров..." onSearch={handleSearch} height="40px"/>
                </div>
            </div>

            <nav className={styles.navButtonsBlock}>
                <a className={styles.navButton} href="">
                    Главная
                </a>
                <a className={styles.navButton + " " + styles.active} href="">
                    Каталог
                </a>
                <a className={styles.navButton} href="">
                    О нас
                </a>
            </nav>
        </header>
    )
}
