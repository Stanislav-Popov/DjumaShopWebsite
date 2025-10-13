/** @format */

import { useState, useContext, useMemo } from "react"
import { CatalogContext } from "../../context/CatalogContext"
import styles from "./catalogSidebar.module.css"
import FilterSection from "./../FilterSection/FilterSection"
import SearchInput from "../SearchInput/SearchInput"
import Button from "../Button/Button"

function generateFiltersData(products) {
    const brands = [...new Set(products.map((p) => p.brand))]
    const colors = [...new Set(products.map((p) => p.color))]
    const types = [...new Set(products.map((p) => p.type))]

    const allSizes = ["XS", "S", "M", "L", "XL", "XXL"]

    const availableSizes = Array.from(new Set(products.flatMap((p) => p.sizes || [])))

    return {
        brands,
        colors,
        types,
        sizes: {
            all: allSizes,
            available: availableSizes,
        },
    }
}

export default function CatalogSidebar() {
    const { products, isLoading } = useContext(CatalogContext)
    const [brandSearch, setBrandSearch] = useState("")
    const [selectedBrands, setSelectedBrands] = useState([])

    const filtersData = generateFiltersData(products)

    const handleBrandChange = (brand, checked) => {
        setSelectedBrands((prev) => (checked ? [...prev, brand] : prev.filter((b) => b !== brand)))
    }

    const searchedBrands = useMemo(() => {
        return filtersData.brands.filter((brand) =>
            brand.toLowerCase().includes(brandSearch.toLocaleLowerCase())
        )
    }, [filtersData.brands, brandSearch])

    const displayBrands = useMemo(() => {
        const searchedSet = new Set(searchedBrands)
        const selectedButHidden = selectedBrands.filter((brand) => !searchedSet.has(brand))
        return [...searchedBrands, ...selectedButHidden]
    })

    if (isLoading) {
        return (
            <aside className={styles.sidebar}>
                <p>Загрузка фильтров ...</p>
            </aside>
        )
    }

    return (
        <aside className={styles.sidebar}>
            <FilterSection title="Брэнд" defaultOpen>
                <SearchInput placeholder="Поиск брэнда ..." onSearch={setBrandSearch} />
                <ul className={styles.checkboxList}>
                    {displayBrands.map((brand) => {
                        const isSelected = selectedBrands.includes(brand)
                        const isHiddenBySearch = !searchedBrands.includes(brand)

                        return (
                            <li key={brand}>
                                <label
                                    className={`${styles.checkboxLabel} ${
                                        isHiddenBySearch ? styles.hiddenItem : ""
                                    }`}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => handleBrandChange(brand, e.target.checked)}
                                    />
                                    <span>{brand}</span>
                                </label>
                            </li>
                        )
                    })}
                    {searchedBrands.length === 0 && <li className={styles.noResult}>Ничего не найдено</li>}
                </ul>
            </FilterSection>

            <FilterSection title="Размер">
                <ul className={styles.checkboxList}>
                    {filtersData.sizes.all.map((size) => {
                        const isAvailable = filtersData.sizes.available.includes(size)
                        return (
                            <li key={size}>
                                <label
                                    className={`${styles.checkboxLabel} ${
                                        !isAvailable ? styles.disabled : ""
                                    }`}>
                                    <input type="checkbox" disabled={!isAvailable} />
                                    <span>{size}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </FilterSection>

            <FilterSection title="Тип">
                <ul className={styles.checkboxList}>
                    {filtersData.types.map((type) => (
                        <li key={type}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" />
                                <span>{type}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </FilterSection>

            <FilterSection title="Цвет">
                <ul className={styles.checkboxList}>
                    {filtersData.colors.map((color) => (
                        <li key={color}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" />
                                <span>{color}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </FilterSection>

            <div className={styles.filterActions}>
                <Button variant="secondary">Сбросить</Button>
                <Button>Применить</Button>
            </div>
        </aside>
    )
}
