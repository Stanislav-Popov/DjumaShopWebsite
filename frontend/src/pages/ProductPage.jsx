/** @format */

import styles from "./../styles/productPage.module.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Button from "./../components/Button/Button"
import CatalogProductCard from "./../components/ProductCard/CatalogProductCard"

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [related, setRelated] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const ALLSIZES = ["XS", "S", "M", "L", "XL", "XXL"]

    useEffect(() => {
        fetch(`/product.json`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data)
                setSelectedImage(data.images[0])
                setRelated([data, data, data, data])
            })
            .catch((error) => {
                console.error("Ошибка:", error)
            })
    }, [id])

    if (!product) {
        return <div className={styles.loading}>Загрузка ...</div>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainSection}>
                {/* Левая колонка */}
                <div className={styles.gallery}>
                    <div className={styles.thumbs}>
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={product.name}
                                className={`${styles.thumb} ${
                                    selectedImage === img ? styles.activeThumb : ""
                                }`}
                                onClick={() => {
                                    setSelectedImage(img)
                                }}
                            />
                        ))}
                    </div>

                    <div className={styles.mainImage}>
                        <img src={selectedImage} alt={product.name} />
                    </div>
                </div>

                {/* Правая колонка */}
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>{product.price}</p>

                    <div className={styles.sizes}>
                        <p className={styles.sizesLabel}>Размеры:</p>
                        <div className={styles.sizeList}>
                            {ALLSIZES.map((size) => (
                                <Button
                                    key={size}
                                    className={styles.sizeButton}
                                    size="small"
                                    variant={selectedSize === size ? "primary" : "secondary"}
                                    onClick={() => {
                                        setSelectedSize(size)
                                    }}>
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Button
                        size="large"
                        onClick={() => console.log("Добавлено в корзину")}
                        className={styles.addButton}>
                        Добавить в корзину
                    </Button>

                    <div className={styles.description}>
                        <p>
                            <strong>Цвет: </strong>
                            {product.color}
                        </p>
                        <p>
                            <strong>Бренд: </strong>
                            {product.brand}
                        </p>
                        <p className={styles.descText}>{product.description}</p>
                    </div>
                </div>
            </div>

            {/* Блок смотреть также */}
            <div className={styles.relatedBlock}>
                <h2 className={styles.relatedTitle}>Смотреть также</h2>
                <div className={styles.relatedGrid}>
                    {related.map((item) => (
                        <CatalogProductCard key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}
