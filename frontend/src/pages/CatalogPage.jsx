/** @format */
import { Layout } from "antd"
import AppHeader from "../components/AppHeader"
import CatalogContent from "../components/catalogContent"
import { CatalogProvider } from "../context/CatalogContext"

const { Footer, Sider } = Layout

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
    overflowY: "auto",
    minHeight: "100vh",
    width: "100%",
}

export default function CatalogPage() {
    return (
        <CatalogProvider>
            <Layout style={layoutStyle}>
                <AppHeader></AppHeader>
                <Layout>
                    <Sider width="25%" style={siderStyle}>
                        Sider
                    </Sider>
                    <CatalogContent></CatalogContent>
                </Layout>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </CatalogProvider>
    )
}
