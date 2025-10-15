/** @format */
import styles from "./CatalogProductCard.module.css"
import { useNavigate } from "react-router-dom"

export default function CatalogProductCard({ product }) {
    const navigate = useNavigate()
    const imageSrc = Array.isArray(product.images) ? product.images[0] : product.image

    const handleClick = (id) => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        console.log("123")
        navigate(`/product/${id}`)
    }

    return (
        <div className={styles.card} onClick={() => handleClick(product.id)}>
            <img className={styles.image} src={imageSrc} alt="" />
            <div className={styles.info}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.price}>{product.price}</p>
            </div>
        </div>
    )
}
