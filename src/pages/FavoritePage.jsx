import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function FavoritePage() {

    const [favorites, setFavorites] = useState([])

    function getFavorites() {
        const data = JSON.parse(
            localStorage.getItem("favorites")
        ) || []

        setFavorites(data)
    }

    useEffect(() => {
        getFavorites()
    }, [])

    function removeFavorite(id) {

        const newFavorites = favorites.filter(
            product => String(product.id) !== String(id)
        )

        localStorage.setItem(
            "favorites",
            JSON.stringify(newFavorites)
        )

        setFavorites(newFavorites)
    }


    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-10">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">
                        My Favorites
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Products you have saved
                    </p>
                </div>

                {/* Empty */}
                {favorites.length === 0 && (
                    <div className="flex min-h-100 items-center justify-center rounded-3xl bg-white shadow-sm">

                        <div className="text-center">

                            <div className="mb-5 text-7xl">
                                ♡
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">
                                No Favorites Yet
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Start adding products you love.
                            </p>

                            <NavLink
                                to="/product"
                                className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
                            >
                                Browse Products
                            </NavLink>

                        </div>

                    </div>
                )}

                {/* Products */}
                {favorites.length > 0 && (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-500">
                                {favorites.length} favorite
                                {favorites.length > 1 ? "s" : ""}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                            {favorites.map(product => (

                                <div
                                    key={product.id}
                                    className="group"
                                >

                                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">

                                        <NavLink
                                            to={`/product/${product.id}`}
                                        >
                                            <div className="bg-gray-100">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-96 w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        </NavLink>

                                        {/* Remove Favorite */}
                                        <button
                                            onClick={() =>
                                                removeFavorite(product.id)
                                            }
                                            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-red-500 shadow-lg transition hover:scale-110"
                                        >
                                            ♥
                                        </button>

                                        {/* Discount */}
                                        {product.discountPercent > 0 && (
                                            <div className="absolute left-4 top-4 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                                                -{product.discountPercent}%
                                            </div>
                                        )}

                                    </div>

                                    {/* Information */}
                                    <div className="px-2 pt-5">

                                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                                            {product.shop}
                                        </p>

                                        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
                                            {product.name}
                                        </h3>

                                        <div className="mt-3 flex items-center gap-3">

                                            <span className="text-2xl font-bold text-gray-900">
                                                ${Number(product.disPrice).toFixed(2)}
                                            </span>

                                            {Number(product.oriPrice) > Number(product.disPrice) && (
                                                <span className="text-base text-gray-400 line-through">
                                                    ${Number(product.oriPrice).toFixed(2)}
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                    </>
                )}

            </div>

        </div>
    )
}

export default FavoritePage