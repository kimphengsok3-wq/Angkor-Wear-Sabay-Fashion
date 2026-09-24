import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProductDetail() {

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [liked, setLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()


    // =========================
    // Get Product
    // =========================

    const getProduct = async () => {

        try {

            setIsLoading(true)
            setError(false)

            const res = await fetch(
                `http://localhost:8000/products/${id}`
            )

            if (!res.ok) {
                throw new Error("Product not found")
            }

            const data = await res.json()

            setProduct(data)

        } catch (error) {

            console.log(error)
            setError(true)

        } finally {

            setIsLoading(false)

        }
    }


    useEffect(() => {

        getProduct()

    }, [id])


    // =========================
    // Favorite Status
    // =========================

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


    // =========================
    // Favorite Button
    // =========================

    function handleFavorite() {

        const favorites =
            JSON.parse(localStorage.getItem("favorites")) || []


        if (liked) {

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

            const favoriteProduct = {
                id: product.id,
                image: product.image,
                shop: product.shop,
                name: product.name,
                oriPrice: product.oriPrice,
                disPrice: product.disPrice,
                discountPercent: product.discountPercent
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


        window.dispatchEvent(
            new Event("favoriteChanged")
        )

    }


    // =========================
    // Add To Cart
    // =========================

    function handleAddToCart() {

        // Check Size

        if (!selectedSize) {

            alert("Please select a size.")

            return
        }


        // Check Color

        if (!selectedColor) {

            alert("Please select a color.")

            return
        }


        // Get Cart

        const cart =
            JSON.parse(localStorage.getItem("cart")) || []


        // Check if same product,
        // same size and same color already exists

        const existingProduct = cart.find(
            item =>
                String(item.id) === String(product.id) &&
                item.size === selectedSize &&
                item.color === selectedColor
        )


        if (existingProduct) {

            // Increase quantity

            existingProduct.quantity += quantity

        } else {

            // Create new cart product

            const cartProduct = {

                id: product.id,

                image: product.image,

                shop: product.shop,

                name: product.name,

                oriPrice: product.oriPrice,

                disPrice: product.disPrice,

                discountPercent:
                    product.discountPercent,

                size: selectedSize,

                color: selectedColor,

                quantity: quantity

            }


            cart.push(cartProduct)

        }


        // Save Cart

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        )


        // Go to Cart Page

        navigate("/cart")

    }



    // =========================
    // Loading
    // =========================

    if (isLoading) {

        return (

            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

                    <p className="text-gray-500">
                        Loading product...
                    </p>

                </div>

            </div>

        )

    }


    // =========================
    // Error
    // =========================

    if (error) {

        return (

            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="text-center">

                    <div className="mb-4 text-6xl">
                        😕
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Product Not Found
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Sorry, we couldn't find this product.
                    </p>

                    <button
                        onClick={() => navigate("/product")}
                        className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                    >
                        Back to Products
                    </button>

                </div>

            </div>

        )

    }


    return (

        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">


                {/* =========================
                    Breadcrumb
                ========================= */}

                <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">

                    <span
                        onClick={() => navigate("/")}
                        className="cursor-pointer hover:text-black"
                    >
                        Home
                    </span>

                    <span>/</span>

                    <span className="capitalize">
                        {product?.type}
                    </span>

                    <span>/</span>

                    <span className="truncate text-gray-900">
                        {product?.name}
                    </span>

                </div>


                {/* =========================
                    Main Product
                ========================= */}

                <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-2">


                    {/* =========================
                        Image Section
                    ========================= */}

                    <div className="relative bg-gray-100">


                        {/* Discount */}

                        {product?.discountPercent > 0 && (

                            <div className="absolute left-6 top-6 z-10 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">

                                -{product?.discountPercent}%

                            </div>

                        )}


                        {/* Favorite */}

                        <button
                            onClick={handleFavorite}
                            className={`absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:scale-105 ${
                                liked
                                    ? "text-red-500"
                                    : "text-gray-700 hover:text-red-500"
                            }`}
                        >

                            {liked ? "♥" : "♡"}

                        </button>


                        {/* Product Image */}

                        <div className="flex min-h-[520px] items-center justify-center p-8 md:min-h-[640px]">

                            <img
                                src={product?.image}
                                alt={product?.name}
                                className="max-h-[580px] w-full object-contain mix-blend-multiply transition duration-500 hover:scale-105"
                            />

                        </div>

                    </div>


                    {/* =========================
                        Product Information
                    ========================= */}

                    <div className="flex flex-col p-6 md:p-10 lg:p-12">


                        {/* Shop */}

                        <div className="mb-3">

                            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">

                                {product?.shop}

                            </span>

                        </div>


                        {/* Product Name */}

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">

                            {product?.name}

                        </h1>


                        {/* Category */}

                        <div className="mt-3 flex flex-wrap gap-2">

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">

                                {product?.type}

                            </span>

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">

                                {product?.people}

                            </span>

                        </div>


                        {/* Rating */}

                        <div className="mt-5 flex items-center gap-3">

                            <div className="flex text-yellow-400">
                                ★★★★★
                            </div>

                            <span className="text-sm font-medium text-gray-600">
                                4.8
                            </span>

                            <span className="text-sm text-gray-400">
                                (124 reviews)
                            </span>

                        </div>


                        {/* Price */}

                        <div className="mt-7 flex flex-wrap items-center gap-3">

                            <span className="text-4xl font-bold text-gray-900">

                                ${Number(product?.disPrice).toFixed(2)}

                            </span>


                            {Number(product?.oriPrice) >
                                Number(product?.disPrice) && (

                                <span className="text-lg text-gray-400 line-through">

                                    ${Number(product?.oriPrice).toFixed(2)}

                                </span>

                            )}


                            {product?.discountPercent > 0 && (

                                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">

                                    SAVE {product?.discountPercent}%

                                </span>

                            )}

                        </div>


                        {/* Description */}

                        <p className="mt-6 leading-7 text-gray-600">

                            A stylish and comfortable{" "}

                            {product?.type}

                            {" "}designed for{" "}

                            {product?.people === "kids"
                                ? "kids."
                                : `${product?.people}.`}

                            {" "}Perfect for everyday wear and casual occasions.

                        </p>


                        <div className="my-7 h-px bg-gray-200" />


                        {/* =========================
                            Size
                        ========================= */}

                        <div>

                            <div className="mb-3 flex items-center justify-between">

                                <span className="font-semibold text-gray-900">
                                    Size
                                </span>

                                <button
                                    type="button"
                                    className="text-sm text-gray-500 underline hover:text-black"
                                >
                                    Size Guide
                                </button>

                            </div>


                            <div className="flex flex-wrap gap-3">

                                {["XS", "S", "M", "L", "XL"].map(
                                    (size) => (

                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() =>
                                            setSelectedSize(size)
                                        }
                                        className={`h-11 w-12 rounded-lg border text-sm font-semibold transition ${
                                            selectedSize === size
                                                ? "border-black bg-black text-white"
                                                : "border-gray-300 bg-white text-gray-700 hover:border-black"
                                        }`}
                                    >

                                        {size}

                                    </button>

                                ))}

                            </div>

                        </div>


                        {/* =========================
                            Color
                        ========================= */}

                        <div className="mt-7">

                            <div className="mb-3">

                                <span className="font-semibold text-gray-900">
                                    Color:
                                </span>

                                <span className="ml-2 text-sm text-gray-500">
                                    {selectedColor || "Please select"}
                                </span>

                            </div>


                            <div className="flex gap-4">


                                {/* Black */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedColor("Black")
                                    }
                                    aria-label="Black"
                                    className={`h-9 w-9 rounded-full bg-black transition ${
                                        selectedColor === "Black"
                                            ? "ring-2 ring-black ring-offset-2"
                                            : ""
                                    }`}
                                />


                                {/* White */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedColor("White")
                                    }
                                    aria-label="White"
                                    className={`h-9 w-9 rounded-full border border-gray-300 bg-white transition ${
                                        selectedColor === "White"
                                            ? "ring-2 ring-black ring-offset-2"
                                            : ""
                                    }`}
                                />


                                {/* Pink */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedColor("Pink")
                                    }
                                    aria-label="Pink"
                                    className={`h-9 w-9 rounded-full bg-pink-400 transition ${
                                        selectedColor === "Pink"
                                            ? "ring-2 ring-black ring-offset-2"
                                            : ""
                                    }`}
                                />

                            </div>

                        </div>


                        {/* =========================
                            Quantity + Cart
                        ========================= */}

                        <div className="mt-8 flex gap-3">


                            {/* Quantity */}

                            <div className="flex items-center rounded-xl border border-gray-300 bg-white">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity(
                                            quantity > 1
                                                ? quantity - 1
                                                : 1
                                        )
                                    }
                                    className="px-4 py-3 text-lg text-gray-500 transition hover:text-black"
                                >
                                    −
                                </button>


                                <span className="min-w-8 text-center font-semibold">
                                    {quantity}
                                </span>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity(quantity + 1)
                                    }
                                    className="px-4 py-3 text-lg text-gray-500 transition hover:text-black"
                                >
                                    +
                                </button>

                            </div>


                            {/* Add Cart */}

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="flex flex-1 items-center justify-center rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
                            >

                                Add to Cart

                            </button>

                        </div>


                        {/* =========================
                            Shipping
                        ========================= */}

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


                {/* =========================
                    Product Details
                ========================= */}

                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm md:p-8">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Product Details
                    </h2>

                    <p className="mt-2 text-gray-500">
                        More information about this product
                    </p>


                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


                        {/* Brand */}

                        <div className="rounded-2xl bg-gray-50 p-5">

                            <p className="text-sm text-gray-500">
                                Brand
                            </p>

                            <p className="mt-2 font-semibold text-gray-900">
                                {product?.shop}
                            </p>

                        </div>


                        {/* Category */}

                        <div className="rounded-2xl bg-gray-50 p-5">

                            <p className="text-sm text-gray-500">
                                Category
                            </p>

                            <p className="mt-2 font-semibold capitalize text-gray-900">
                                {product?.type}
                            </p>

                        </div>


                        {/* For */}

                        <div className="rounded-2xl bg-gray-50 p-5">

                            <p className="text-sm text-gray-500">
                                For
                            </p>

                            <p className="mt-2 font-semibold capitalize text-gray-900">
                                {product?.people}
                            </p>

                        </div>


                        {/* Product ID */}

                        <div className="rounded-2xl bg-gray-50 p-5">

                            <p className="text-sm text-gray-500">
                                Product ID
                            </p>

                            <p className="mt-2 font-semibold text-gray-900">
                                #{product?.id}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ProductDetail