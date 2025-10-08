/** @format */
import styles from "./../styles/catalogProductsBlock.module.css"
import { useEffect, useState } from "react"
import ProductList from "./ProductList/ProductList"
import Pagination from "./Pagination/Pagination"

export default function CatalogProductsCard() {
    const PRODUCTSPERPAGE = 32

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    // Требуются price, name, id, image
    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log("Ошибка загрузки продуктов из json", err))
    }, [])

    const indexOfLast = currentPage * PRODUCTSPERPAGE
    const indexOfFirst = indexOfLast - PRODUCTSPERPAGE
    const currentProducts = products.slice(indexOfFirst, indexOfLast)
    const totalPages = Math.ceil(products.length / PRODUCTSPERPAGE)

    return (
        <div className={styles.catalogWrapper}>
            <ProductList currentProducts={currentProducts}></ProductList>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}></Pagination>
        </div>
    )
}
