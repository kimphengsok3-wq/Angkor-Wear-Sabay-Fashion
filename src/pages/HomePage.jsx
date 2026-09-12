import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getFeaturedProducts() {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:8000/products")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFeaturedProducts()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-900 text-white px-8 md:px-20 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="uppercase tracking-widest text-sm text-blue-400 font-semibold mb-3">
            New Season Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            Style That <span className="text-blue-400">Speaks</span> For You
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            Discover the latest jackets, denim and streetwear — curated
            picks, unbeatable prices, delivered fast.
          </p>
          <NavLink
            to="/product"
            className="inline-block bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold px-8 py-3 rounded-lg"
          >
            Shop Now
          </NavLink>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-8 md:px-20 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <NavLink to="/product" className="text-blue-500 font-semibold hover:underline">
            View All →
          </NavLink>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.slice(0, 8).map((pro) => (
              <NavLink key={pro.id} to={`/product/${pro.id}`}>
                <ProductCard
                  image={pro.image}
                  shop={pro.shop}
                  name={pro.name}
                  oriPrice={pro.oriPrice}
                  disPrice={pro.disPrice}
                />
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Promo Banner */}
      <div className="bg-blue-50 px-8 md:px-20 py-14 my-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Free Shipping On Orders Over $50
        </h3>
        <p className="text-gray-600 mb-6">
          Plus 30-day easy returns on everything, every time.
        </p>
        <NavLink
          to="/product"
          className="inline-block border-2 border-black hover:bg-black hover:text-white transition-colors font-semibold px-8 py-3 rounded-lg"
        >
          Browse Collection
        </NavLink>
      </div>
    </div>
  )
}

export default HomePage