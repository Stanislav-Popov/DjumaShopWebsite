/** @format */
import { Layout } from "antd"
import CatalogUnderHeader from "./../components/CatalogUnderHeader"
import AppHeader from "../components/AppHeader"

const { Footer, Sider, Content } = Layout

const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#0958d9",
}
const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#1677ff",
}
const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
}
const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    height: "100vh",
    width: "100%",
}

export default function CatalogPage() {
    return (
        <Layout style={layoutStyle}>
            <AppHeader></AppHeader>
            <Layout>
                <Sider width="25%" style={siderStyle}>
                    Sider
                </Sider>
                <Content style={contentStyle}>
                    <CatalogUnderHeader></CatalogUnderHeader>
                </Content>
            </Layout>
            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    )
}
