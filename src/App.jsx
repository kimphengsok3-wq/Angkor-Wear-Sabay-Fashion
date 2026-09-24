import { Route, Routes, useLocation } from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductPage from './pages/ProductPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'
import FavoritePage from './pages/FavoritePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccess from './pages/OrderSuccess'

import RoleSelection from './admin/RoleSelection'
import AdminLogin from './admin/AdminLogin'
import AdminProducts from './admin/AdminProducts'


function AppContent() {

    const location = useLocation()

    const isAdminPage =
        location.pathname === '/' ||
        location.pathname.startsWith('/admin')

    return (
        <div>

            {/* Don't show Navbar on Role Selection or Admin pages */}
            {!isAdminPage && <Navbar />}

            <ScrollToTop />

            <Routes>

                {/* FIRST PAGE */}
                <Route path="/" element={<RoleSelection />} />

                {/* USER PAGES */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/favorite" element={<FavoritePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* ADMIN PAGES */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/products" element={<AdminProducts />} />

            </Routes>

            {/* Don't show Footer on Role Selection or Admin pages */}
            {!isAdminPage && <Footer />}

        </div>
    )
}


function App() {
    return <AppContent />
}

export default App