/** @format */
import styles from "./CatalogProductCard.module.css"

export default function CatalogProductCard({ product }) {
    return (
        <div className={styles.card}>
            <img className={styles.image} src={product.image} alt="" />
            <div className={styles.info}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.price}>{product.price}</p>
            </div>
        </div>
    )
}
