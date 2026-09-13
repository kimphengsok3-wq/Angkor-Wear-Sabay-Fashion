import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductPage from './pages/ProductPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'
import Create from './pages/Create'
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/product' element={<ProductPage/>}/>
        <Route path='/create' element={<Create/>}/>

        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>
      {/* <Footer/> */}
    </div>
  )
}

export default App