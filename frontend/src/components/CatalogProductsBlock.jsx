/** @format */
import { useEffect, useState } from "react"
import CatalogProductCard from "./ProductCard/CatalogProductCard"
import styles from "./../styles/catalogProductsBlock.module.css"

export default function CatalogProductsCard() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log("Ошибка загрузки продуктов из json", err))
    }, [])

    return (
        <div className={styles.container}>
            {products.map((p) => (
                <CatalogProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}
