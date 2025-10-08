/** @format */
import CatalogUnderHeader from "./../components/CatalogUnderHeader"
import CatalogProductsBlock from "./../components/CatalogProductsBlock"
import { Layout } from "antd"

const { Content } = Layout

const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    color: "#000",
    backgroundColor: "#fff",
}

export default function CatalogContent() {
    return (
        <Layout>
            <Content style={contentStyle}>
                <CatalogUnderHeader></CatalogUnderHeader>
                <CatalogProductsBlock></CatalogProductsBlock>
            </Content>
        </Layout>
    )
}
