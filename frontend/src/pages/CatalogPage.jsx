/** @format */
import AppHeader from "../components/AppHeader"
import CatalogContent from "../components/catalogContent"
import { CatalogProvider } from "../context/CatalogContext"
import styles from "./../styles/catalogPage.module.css"
import CatalogSidebar from "./../components/CatalogSidebar/CatalogSidebar"

export default function CatalogPage() {
    return (
        <CatalogProvider>
            <div className={styles.layout}>
                <AppHeader />

                <div className={styles.main}>
                    <CatalogSidebar />
                    <CatalogContent className={styles.content}/>
                </div>

                <footer className={styles.footer}>Footer</footer>
            </div>
        </CatalogProvider>
    )
}
