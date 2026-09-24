import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCard({
    id,
    image,
    shop,
    name,
    oriPrice,
    disPrice,
    discountPercent
}) {

    const navigate = useNavigate()

    const [liked, setLiked] = useState(false)

    // Check Favorite
    useEffect(() => {

        function updateFavoriteStatus() {

            const favorites =
                JSON.parse(localStorage.getItem("favorites")) || []

            const isFavorite = favorites.some(
                product =>
                    String(product.id) === String(id)
            )

            setLiked(isFavorite)
        }

        updateFavoriteStatus()

        window.addEventListener(
            "storage",
            updateFavoriteStatus
        )

        window.addEventListener(
            "favoriteChanged",
            updateFavoriteStatus
        )

        return () => {

            window.removeEventListener(
                "storage",
                updateFavoriteStatus
            )

            window.removeEventListener(
                "favoriteChanged",
                updateFavoriteStatus
            )

        }

    }, [id])


    // Favorite Button
    function handleLike(e) {

        e.preventDefault()
        e.stopPropagation()

        const favorites =
            JSON.parse(localStorage.getItem("favorites")) || []


        if (liked) {

            // Remove Favorite

            const newFavorites = favorites.filter(
                product =>
                    String(product.id) !== String(id)
            )

            localStorage.setItem(
                "favorites",
                JSON.stringify(newFavorites)
            )

            setLiked(false)

        } else {

            // Add Favorite

            const favoriteProduct = {
                id,
                image,
                shop,
                name,
                oriPrice,
                disPrice,
                discountPercent
            }

            const newFavorites = [
                ...favorites,
                favoriteProduct
            ]

            localStorage.setItem(
                "favorites",
                JSON.stringify(newFavorites)
            )

            setLiked(true)

        }


        // Update other components

        window.dispatchEvent(
            new Event("favoriteChanged")
        )

    }


    // Product Detail
    function handleProductClick() {

        navigate(`/product/${id}`)

    }


    // Add To Cart
    function handleAddToCart(e) {

        e.preventDefault()
        e.stopPropagation()

        // Go to Product Detail
        navigate(`/product/${id}`)

    }


    return (

        <div
            className="group cursor-pointer"
            onClick={handleProductClick}
        >

            {/* Product Image */}

            <div className="relative overflow-hidden rounded-3xl bg-gray-100">

                <img
                    src={image}
                    alt={name}
                    className="h-96 w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                />


                {/* Discount */}

                {discountPercent > 0 && (

                    <div className="absolute left-4 top-4 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-md">

                        -{discountPercent}%

                    </div>

                )}


                {/* Favorite */}

                <button
                    onClick={handleLike}
                    className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition duration-200 hover:scale-110 ${
                        liked
                            ? "text-red-500"
                            : "text-gray-700 hover:text-red-500"
                    }`}
                >

                    {liked ? "♥" : "♡"}

                </button>


                {/* Add To Cart */}

                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 left-4 right-4 translate-y-16 rounded-2xl bg-black py-4 text-base font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gray-800"
                >

                    Add to Cart

                </button>

            </div>


            {/* Product Information */}

            <div className="px-2 pt-5">

                {/* Shop */}

                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">

                    {shop}

                </p>


                {/* Product Name */}

                <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">

                    {name}

                </h3>


                {/* Price */}

                <div className="mt-3 flex items-center gap-3">

                    <span className="text-2xl font-bold text-gray-900">

                        ${Number(disPrice).toFixed(2)}

                    </span>


                    {Number(oriPrice) > Number(disPrice) && (

                        <span className="text-base text-gray-400 line-through">

                            ${Number(oriPrice).toFixed(2)}

                        </span>

                    )}

                </div>


                {/* Rating + Shipping */}

                <div className="mt-4 flex items-center justify-between">

                    <div className="flex items-center gap-1.5">

                        <span className="text-lg text-yellow-400">
                            ★
                        </span>

                        <span className="text-sm font-semibold text-gray-700">
                            4.8
                        </span>

                    </div>


                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">

                        Free shipping

                    </span>

                </div>

            </div>

        </div>

    )
}

export default ProductCard