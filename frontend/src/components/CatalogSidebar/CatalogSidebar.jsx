/** @format */

import { useState, useContext, useMemo } from "react"
import { CatalogContext } from "../../context/CatalogContext"
import styles from "./catalogSidebar.module.css"
import FilterSection from "./../FilterSection/FilterSection"
import SearchInput from "../SearchInput/SearchInput"
import Button from "../Button/Button"

/**
 * Формирует "справочник" опций для фильтров на основе имеющихся товаров.
 * Возвращает:
 *  - brands: массив брендов, найденных в allProducts
 *  - colors: массив цветов, найденных в allProducts
 *  - types: массив типов, найденных в allProducts
 *  - sizes:
 *      - all: полный набор возможных размеров (жёстко задан)
 *      - available: размеры, которые реально присутствуют у товаров
 */
function generateFiltersData(products, allSizes) {
    const brands = [...new Set(products.map((p) => p.brand))].filter(Boolean)
    const colors = [...new Set(products.map((p) => p.color))].filter(Boolean)
    const types = [...new Set(products.map((p) => p.type))].filter(Boolean)

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
    const { allProducts, isLoading, allSizes, setFilters, setCurrentPage } = useContext(CatalogContext)
    const [brandSearch, setBrandSearch] = useState("")
    const [resetKey, setResetKey] = useState(0)
    const [localFilters, setLocalFilters] = useState({
        brands: [],
        colors: [],
        types: [],
        sizes: [],
        price: {
            min: null,
            max: null,
        },
    })

    const filtersData = generateFiltersData(allProducts, allSizes)

    /**
     * toggleFilter(category, value, checked)
     * Универсальная функция для включения/выключения значения в локальном наборе фильтров.
     * category: 'brands' | 'colors' | 'types' | 'sizes'
     */
    const toggleFilter = (category, value, checked) => {
        setLocalFilters((prev) => {
            const current = prev[category] || []
            return {
                ...prev,
                [category]: checked ? [...current, value] : current.filter((v) => v !== value),
            }
        })
    }

    // SearchedBrands — бренды, соответствующие текущему тексту поиска.
    const searchedBrands = useMemo(() => {
        return filtersData.brands.filter((brand) =>
            brand.toLowerCase().includes(brandSearch.toLocaleLowerCase())
        )
    }, [filtersData.brands, brandSearch])

    //displayBrands — список брендов, отображаемых в UI.
    const displayBrands = useMemo(() => {
        const searchedSet = new Set(searchedBrands)
        const selectedButHidden = (localFilters.brands || []).filter((brand) => !searchedSet.has(brand))

        return [...searchedBrands, ...selectedButHidden]
    }, [searchedBrands, localFilters.brands])

    // Нажатие кнопки "Применить": передаём локальные фильтры в контекст
    const handleApply = () => {
        setFilters(localFilters)
        setCurrentPage(1)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Нажатие кнопки "Сбросить": очищение локальных и глобальных фильтров
    const handleReset = () => {
        const resetState = {
            brands: [],
            colors: [],
            types: [],
            sizes: [],
            price: { min: null, max: null },
        }
        setLocalFilters(resetState)
        setFilters(resetState)
        setBrandSearch("")
        setResetKey((prev) => prev + 1)
        setCurrentPage(1)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (isLoading) {
        return (
            <aside className={styles.sidebar}>
                <p>Загрузка фильтров ...</p>
            </aside>
        )
    }

    return (
        <aside className={styles.sidebar}>
            <FilterSection title="Брэнд" defaultOpen resetKey={resetKey}>
                <SearchInput key={resetKey} placeholder="Поиск брэнда ..." onSearch={setBrandSearch} />
                <ul className={styles.checkboxList}>
                    {displayBrands.map((brand) => {
                        const isSelected = localFilters.brands.includes(brand)
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
                                        onChange={(e) => toggleFilter("brands", brand, e.target.checked)}
                                    />
                                    <span>{brand}</span>
                                </label>
                            </li>
                        )
                    })}
                    {searchedBrands.length === 0 && <li className={styles.noResult}>Ничего не найдено</li>}
                </ul>
            </FilterSection>

            <FilterSection title="Размер" resetKey={resetKey}>
                <ul className={styles.checkboxList}>
                    {filtersData.sizes.all.map((size) => {
                        const isAvailable = filtersData.sizes.available.includes(size)
                        const isSelected = localFilters.sizes.includes(size)
                        return (
                            <li key={size}>
                                <label
                                    className={`${styles.checkboxLabel} ${
                                        !isAvailable ? styles.disabled : ""
                                    }`}>
                                    <input
                                        type="checkbox"
                                        disabled={!isAvailable}
                                        checked={isSelected}
                                        onChange={(e) => toggleFilter("sizes", size, e.target.checked)}
                                    />
                                    <span>{size}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </FilterSection>

            <FilterSection title="Тип" resetKey={resetKey}>
                <ul className={styles.checkboxList}>
                    {filtersData.types.map((type) => {
                        const isSelected = localFilters.types.includes(type)

                        return (
                            <li key={type}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => toggleFilter("types", type, e.target.checked)}
                                    />
                                    <span>{type}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </FilterSection>

            <FilterSection title="Цвет" resetKey={resetKey}>
                <ul className={styles.checkboxList}>
                    {filtersData.colors.map((color) => {
                        const isSelected = localFilters.colors.includes(color)

                        return (
                            <li key={color}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => toggleFilter("colors", color, e.target.checked)}
                                    />
                                    <span>{color}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </FilterSection>

            <div className={styles.filterActions}>
                <Button variant="secondary" onClick={handleReset}>
                    Сбросить
                </Button>
                <Button onClick={handleApply}>Применить</Button>
            </div>
        </aside>
    )
}
