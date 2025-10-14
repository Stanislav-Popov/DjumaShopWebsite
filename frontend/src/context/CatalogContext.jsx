/** @format */

import { createContext, useState, useEffect, useMemo } from "react"

export const CatalogContext = createContext()
const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

export function CatalogProvider({ children }) {
    const [allProducts, setAllProducts] = useState([])
    const [sortType, setSortType] = useState("new")
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({
        brands: [],
        types: [],
        sizes: [],
        colors: [],
        price: { min: null, max: null },
    })

    useEffect(() => {
        setIsLoading(true)
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => {
                setAllProducts(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("Ошибка загрузки продуктов", err)
                setIsLoading(false)
            })
    }, [])

    const sortedProducts = useMemo(() => {
        let sorted = [...allProducts]
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
    }, [sortType, allProducts])

    const filteredProducts = useMemo(() => {
        return sortedProducts.filter((product) => {
            if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
                return false
            }

            if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
                return false
            }

            if (filters.types.length > 0 && !filters.types.includes(product.type)) {
                return false
            }

            if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
                return false
            }

            if (filters.price.min !== null && product.price < filters.price.min) {
                return false
            }

            if (filters.price.max !== null && product.price > filters.price.max) {
                return false
            }

            return true
        })
    }, [sortedProducts, filters])

    const count = filteredProducts.length

    return (
        <CatalogContext.Provider
            value={{
                products: filteredProducts,
                allProducts,
                count,
                sortType,
                setSortType,
                filters,
                setFilters,
                isLoading,
                allSizes: ALL_SIZES,
            }}>
            {children}
        </CatalogContext.Provider>
    )
}
