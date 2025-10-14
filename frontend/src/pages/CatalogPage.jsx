/** @format */
import CatalogContent from "../components/CatalogContent"
import { CatalogProvider } from "../context/CatalogContext"
import styles from "./../styles/catalogPage.module.css"
import CatalogSidebar from "./../components/CatalogSidebar/CatalogSidebar"

export default function CatalogPage() {
    return (
        <CatalogProvider>
            <div className={styles.layout}>
                <div className={styles.main}>
                    <CatalogSidebar />
                    <CatalogContent className={styles.content} />
                </div>

                <footer className={styles.footer}>Footer</footer>
            </div>
        </CatalogProvider>
    )
}
