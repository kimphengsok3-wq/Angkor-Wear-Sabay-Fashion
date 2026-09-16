import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ProductDetail() {

  const [product, setProduct] = useState({})

  const param = useParams()
  const id = param.id

  const getProduct = async ()=>{
    try{
      const res = await fetch(`http://localhost:8000/products/${id}`)
      const data = await res.json()
      setProduct(data)
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getProduct()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        
        <div className="mb-6 text-sm text-gray-500">
          Home <span className="mx-2">/</span>
          Dresses <span className="mx-2">/</span>
          <span className="text-gray-900">{product?.name}</span>
        </div>

        {/* Product Card */}
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2">
          
          {/* Product Image */}
          <div className="flex min-h-125 items-center justify-center bg-gray-100 p-8">
            <img
              src={product?.image}
              alt={product?.name}
              className="h-137.5 w-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col p-8 md:p-12">
            
            {/* Shop */}
            <div className="mb-3">
              <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
                {product?.shop}
                
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {product?.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex text-yellow-400">
                ★★★★★
              </div>

              <span className="text-sm text-gray-500">
                4.8 (124 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product?.disPrice?.toFixed(2)}
              </span>

              <span className="text-lg text-gray-400 line-through">
                ${product?.oriPrice?.toFixed(2)}
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                SALE
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 leading-7 text-gray-600">
              A stylish spaghetti strap mini dress designed for a clean,
              comfortable and elegant look. Perfect for casual days,
              parties, or a night out.
            </p>

            <div className="my-8 h-px bg-gray-200" />

            {/* Size */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-gray-900">Size</span>

                <button className="text-sm text-gray-500 underline">
                  Size Guide
                </button>
              </div>

              <div className="flex gap-3">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="h-11 w-11 rounded-lg border border-gray-300 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mt-7">
              <span className="mb-3 block font-semibold text-gray-900">
                Color
              </span>

              <div className="flex gap-3">
                <button className="h-9 w-9 rounded-full bg-black ring-2 ring-black ring-offset-2" />
                <button className="h-9 w-9 rounded-full bg-white ring-1 ring-gray-300" />
                <button className="h-9 w-9 rounded-full bg-pink-400 ring-1 ring-gray-200" />
              </div>
            </div>

            {/* Quantity + Add Cart */}
            <div className="mt-8 flex gap-3">
              <div className="flex items-center rounded-xl border border-gray-300">
                <button className="px-4 py-3 text-lg text-gray-500 hover:text-black">
                  −
                </button>

                <span className="px-3 font-medium">1</span>

                <button className="px-4 py-3 text-lg text-gray-500 hover:text-black">
                  +
                </button>
              </div>

              <button className="flex flex-1 items-center justify-center rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800">
                Add to Cart
              </button>

              <button className="rounded-xl border border-gray-300 px-5 text-xl transition hover:bg-gray-100">
                ♡
              </button>
            </div>

            {/* Buy Now */}
            <button className="mt-3 w-full rounded-xl border-2 border-black py-3 font-semibold text-black transition hover:bg-black hover:text-white">
              Buy Now
            </button>

            {/* Shipping */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div>
                <p className="font-semibold text-gray-900">
                  🚚 Free Shipping
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  On orders over $50
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  ↩ Easy Returns
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  30 day return policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Product Details
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Brand</p>
              <p className="mt-1 font-semibold">{product?.shop}</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Category</p>
              <p className="mt-1 font-semibold">Dresses</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Product ID</p>
              <p className="mt-1 font-semibold">#{product?.id}</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Availability</p>
              <p className="mt-1 font-semibold text-green-600">
                In Stock
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail