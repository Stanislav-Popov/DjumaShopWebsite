/** @format */
/* Доработать:
router
динамическое изменение меню
мобильная версия
архитектуру навигации
*/

import { Layout, Input } from "antd"
import styles from "../styles/AppHeader.module.css"

const { Search } = Input
const { Header } = Layout

function onSearch(value) {
    console.log(value)
}

export default function AppHeader() {
    return (
        <Header className={styles.headerStyle}>
            <div className={styles.logoSearchBlock}>
                <a className={styles.logo} href="">
                    DjumaShop
                </a>

                <Search
                    placeholder="Поиск..."
                    allowClear
                    onSearch={(value) => onSearch(value)}
                    className={styles.searchStyle}
                    size="large"
                />
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
        </Header>
    )
}
