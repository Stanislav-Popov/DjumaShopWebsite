/** @format */
import MainPage from "./pages/MainPage"
import CatalogPage from "./pages/CatalogPage"
import ProductPage from "./pages/ProductPage"
import AboutPage from "./pages/AboutPage"
import AppHeader from "./components/AppHeader"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <AppHeader />
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/catalog" element={<CatalogPage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/product/:id" element={<ProductPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
