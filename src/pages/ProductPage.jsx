import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { NavLink } from 'react-router-dom'

function ProductPage() {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [search, setSearch] = useState("")
  const [type, setType] = useState("all")
  const [people, setPeople] = useState("all")
  const [sort, setSort] = useState("default")

  // ================= CAROUSEL =================

  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      title: "New Arrival",
      subtitle: "Discover Our Latest Collection",
      description: "Find your new favorite clothes and accessories.",
      button: "Shop Now",
      bg: "bg-gray-900"
    },
    {
      title: "70% OFF",
      subtitle: "Limited Time Offer",
      description: "Get amazing deals on selected products.",
      button: "Shop Sale",
      bg: "bg-blue-600"
    }
  ]


  // ================= GET PRODUCTS =================

  async function getAllProducts() {

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

    getAllProducts()

  }, [])


  // ================= AUTO SLIDE =================

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentSlide((prev) => {

        if (prev === banners.length - 1) {
          return 0
        }

        return prev + 1

      })

    }, 8000)

    return () => clearInterval(timer)

  }, [banners.length])


  // ================= NEXT =================

  function nextSlide() {

    setCurrentSlide((prev) => {

      if (prev === banners.length - 1) {
        return 0
      }

      return prev + 1

    })

  }


  // ================= PREVIOUS =================

  function previousSlide() {

    setCurrentSlide((prev) => {

      if (prev === 0) {
        return banners.length - 1
      }

      return prev - 1

    })

  }


  // ================= SEARCH + FILTER + SORT =================

  const filteredProducts = products

    .filter(pro => {

      const matchSearch =
        pro.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchType =
        type === "all" || pro.type === type

      const matchPeople =
        people === "all" || pro.people === people

      return matchSearch && matchType && matchPeople

    })

    .sort((a, b) => {

      if (sort === "low") {
        return Number(a.disPrice) - Number(b.disPrice)
      }

      if (sort === "high") {
        return Number(b.disPrice) - Number(a.disPrice)
      }

      return 0

    })


  return (

    <div className="max-w-7xl mx-auto px-4 py-8">


      {/* ================================================= */}
      {/* CAROUSEL */}
      {/* ================================================= */}

      <div className="relative w-full overflow-hidden rounded-2xl mb-12">


        {/* Slides */}

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`
          }}
        >

          {banners.map((banner, index) => (

            <div
              key={index}
              className={`
                min-w-full
                h-[300px]
                md:h-[400px]
                ${banner.bg}
                relative
                flex
                items-center
                overflow-hidden
              `}
            >

              {/* Banner Content */}

              <div className="relative z-10 px-10 md:px-16 text-white">

                <p className="text-sm md:text-base uppercase tracking-widest text-gray-300 mb-3">
                  {banner.subtitle}
                </p>

                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {banner.title}
                </h1>

                <p className="text-gray-300 text-sm md:text-lg mb-7 max-w-lg">
                  {banner.description}
                </p>

                <NavLink
                  to="/product"
                  className="
                    inline-block
                    bg-white
                    text-black
                    px-6
                    py-3
                    rounded-lg
                    font-semibold
                    hover:bg-gray-200
                    transition
                  "
                >
                  {banner.button}
                </NavLink>

              </div>


              {/* Decorative Circle */}

              <div
                className="
                  absolute
                  -right-20
                  -bottom-40
                  w-[400px]
                  h-[400px]
                  md:w-[550px]
                  md:h-[550px]
                  rounded-full
                  bg-white/10
                "
              />

            </div>

          ))}

        </div>


        {/* ================================================= */}
        {/* PREVIOUS BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={previousSlide}
          className="
            absolute
            left-0
            top-0
            bottom-0
            w-16
            md:w-20
            flex
            items-center
            justify-center
            text-white
            hover:bg-black/10
            transition
          "
        >

          <span
            className="
              text-4xl
              md:text-5xl
              font-light
              opacity-80
              hover:opacity-100
            "
          >
            ‹
          </span>

          <span className="sr-only">
            Previous
          </span>

        </button>


        {/* ================================================= */}
        {/* NEXT BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={nextSlide}
          className="
            absolute
            right-0
            top-0
            bottom-0
            w-16
            md:w-20
            flex
            items-center
            justify-center
            text-white
            hover:bg-black/10
            transition
          "
        >

          <span
            className="
              text-4xl
              md:text-5xl
              font-light
              opacity-80
              hover:opacity-100
            "
          >
            ›
          </span>

          <span className="sr-only">
            Next
          </span>

        </button>


        {/* ================================================= */}
        {/* INDICATORS */}
        {/* ================================================= */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2
            flex
            gap-2
          "
        >

          {banners.map((_, index) => (

            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-300
                ${
                  currentSlide === index
                    ? "w-8 bg-white"
                    : "w-5 bg-white/50 hover:bg-white/80"
                }
              `}
            >

              <span className="sr-only">
                Slide {index + 1}
              </span>

            </button>

          ))}

        </div>

      </div>


      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <h1 className="text-3xl md:text-4xl font-bold">
          All Products
        </h1>

        <p className="text-gray-500 mt-2">
          Find your favorite clothes and accessories
        </p>

      </div>


      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            px-5
            py-3
            border
            border-gray-300
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>


      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">


        {/* Product Type */}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="
            px-4
            py-3
            border
            border-gray-300
            rounded-xl
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >

          <option value="all">All Types</option>
          <option value="shirt">Shirt</option>
          <option value="pant">Pant</option>
          <option value="shoe">Shoe</option>
          <option value="hat">Hat</option>
          <option value="jacket">Jacket</option>
          <option value="dress">Dress</option>
          <option value="short">Short</option>
          <option value="skirt">Skirt</option>
          <option value="accessory">Accessory</option>

        </select>


        {/* People */}

        <select
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="
            px-4
            py-3
            border
            border-gray-300
            rounded-xl
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >

          <option value="all">Everyone</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>

        </select>


        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            px-4
            py-3
            border
            border-gray-300
            rounded-xl
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >

          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>

        </select>

      </div>


      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {isLoading && (

        <div className="text-center py-20">

          <p className="text-gray-500 text-lg">
            Loading products...
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* PRODUCT COUNT */}
      {/* ================================================= */}

      {!isLoading && (

        <div className="mb-5">

          <p className="text-gray-500">
            {filteredProducts.length} products found
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* PRODUCTS */}
      {/* ================================================= */}

      {!isLoading && filteredProducts.length > 0 && (

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-5
          "
        >

          {filteredProducts.map(pro => (

            <NavLink
              key={pro.id}
              to={`/product/${pro.id}`}
            >

              <ProductCard
                id={pro.id}
                image={pro.image}
                shop={pro.shop}
                name={pro.name}
                oriPrice={pro.oriPrice}
                disPrice={pro.disPrice}
                discountPercent={pro.discountPercent}
              />

            </NavLink>

          ))}

        </div>

      )}


      {/* ================================================= */}
      {/* NO PRODUCTS */}
      {/* ================================================= */}

      {!isLoading && filteredProducts.length === 0 && (

        <div className="text-center py-20">

          <div className="text-5xl mb-4">
            🔍
          </div>

          <h2 className="text-xl font-semibold">
            No products found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing your search or filters.
          </p>

        </div>

      )}

    </div>

  )
}

export default ProductPage