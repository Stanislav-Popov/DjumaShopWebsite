/** @format */
import styles from "../styles/catalogUnderHeader.module.css"
import { Dropdown, Button, Space } from "antd"
import { ArrowUpOutlined, ArrowDownOutlined, StarOutlined, DownOutlined } from "@ant-design/icons"

const items = [
    {
        label: "Новое",
        key: "1",
        icon: <StarOutlined />,
    },
    {
        label: "Дороже",
        key: "2",
        icon: <ArrowUpOutlined />,
    },
    {
        label: "Дешевле",
        key: "3",
        icon: <ArrowDownOutlined />,
    },
]

function handleMenuClick() {
    console.log("handleMenuClick")
}

const menuProps = {
    items,
    onClick: handleMenuClick,
}

export default function CatalogUnderHeader() {
    const count = 10

    return (
        <div className={styles.underHeaderStyle}>
            <div className={styles.countBlock}>
                <p>
                    Выбрано товаров: <b>{count}</b>
                </p>
            </div>
            <div className={styles.sortBlock}>
                <Dropdown menu={menuProps}>
                    <Button style={{ width: "300px"}}>
                        <Space>
                            Button
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
        </div>
    )
}
