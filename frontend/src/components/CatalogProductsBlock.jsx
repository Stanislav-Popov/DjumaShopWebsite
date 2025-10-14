/** @format */
import styles from "./../styles/catalogProductsBlock.module.css"
import { useContext, useEffect, useState } from "react"
import ProductList from "./ProductList/ProductList"
import Pagination from "./Pagination/Pagination"
import { CatalogContext } from "../context/CatalogContext"

export default function CatalogProductsBlock() {
    const { products, sortType, currentPage, setCurrentPage, productsPerPage } = useContext(CatalogContext)

    useEffect(() => setCurrentPage(1), [sortType])

    const indexOfLast = currentPage * productsPerPage
    const indexOfFirst = indexOfLast - productsPerPage
    const currentProducts = products.slice(indexOfFirst, indexOfLast)
    const totalPages = Math.ceil(products.length / productsPerPage)

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
