/** @format */
import styles from "./../styles/catalogProductsBlock.module.css"
import { useContext, useEffect, useState } from "react"
import ProductList from "./ProductList/ProductList"
import Pagination from "./Pagination/Pagination"
import { CatalogContext } from "../context/CatalogContext"

export default function CatalogProductsBlock() {
    // Временная константа
    const PRODUCTSPERPAGE = 32

    const { products, sortType } = useContext(CatalogContext)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => setCurrentPage(1), [sortType])

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
