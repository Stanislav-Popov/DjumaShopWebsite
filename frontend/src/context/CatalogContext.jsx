/** @format */

import { createContext, useState, useEffect, useMemo } from "react"

export const CatalogContext = createContext()

export function CatalogProvider({ children }) {
    const [products, setProducts] = useState([])
    const [sortType, setSortType] = useState("new")
    const [filters, setFilters] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("Ошибка загрузки продуктов", err)
                setIsLoading(false)
            })
    }, [])

    const sortedProducts = useMemo(() => {
        let sorted = [...products]
        switch (sortType) {
            case "expensive":
                return sorted.sort((a, b) => b.price - a.price)
            case "cheap":
                return sorted.sort((a, b) => a.price - b.price)
            case "new":
                return sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
            default:
                return sorted
        }
    }, [sortType, products])

    // Заглушка под будущую фильтрацию
    const filteredProducts = useMemo(() => {
        return sortedProducts
    }, [sortedProducts, filters])

    const count = filteredProducts.length

    return (
        <CatalogContext.Provider
            value={{
                products: filteredProducts,
                count,
                sortType,
                setSortType,
                filters,
                setFilters,
                isLoading
            }}>
            {children}
        </CatalogContext.Provider>
    )
}
