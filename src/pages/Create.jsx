import React, { useState } from 'react'

function Create() {

    const [productData, setProductData] = useState({
        name: "",
        shop: "",
        type: "",
        people: "",
        oriPrice: "",
        discountPercent: "",
        image: ""
    })

    function handleinputChange(e) {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        })
    }

    async function handleCreateProduct(e) {
        e.preventDefault()

        // Check if all fields are filled
        if (
            productData.name === "" ||
            productData.shop === "" ||
            productData.type === "" ||
            productData.people === "" ||
            productData.oriPrice === "" ||
            productData.discountPercent === "" ||
            productData.image === ""
        ) {
            alert("Please fill in all information before creating the product!")
            return
        }

        // Calculate discount price
        const oriPrice = Number(productData.oriPrice)
        const discountPercent = Number(productData.discountPercent)

        const disPrice =
            oriPrice - (oriPrice * discountPercent / 100)

        const res = await fetch("http://localhost:8000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: productData.name,
                shop: productData.shop,
                type: productData.type,
                people: productData.people,
                oriPrice: oriPrice,
                discountPercent: discountPercent,
                disPrice: Number(disPrice.toFixed(2)),
                image: productData.image
            })
        })

        const data = await res.json()

        alert("Product created successfully!")
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

            <form
                onSubmit={handleCreateProduct}
                className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-7 text-white">
                    <h1 className="text-3xl font-bold">
                        Create New Product
                    </h1>

                    <p className="text-blue-100 mt-2">
                        Add a new product to your store
                    </p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-5">

                    {/* Product Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Product Name
                        </label>

                        <input
                            onChange={handleinputChange}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter product name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                            bg-gray-50 text-gray-800
                            focus:bg-white focus:outline-none focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500
                            transition duration-200"
                        />
                    </div>

                    {/* Shop */}
                    <div>
                        <label
                            htmlFor="shop"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Shop
                        </label>

                        <input
                            onChange={handleinputChange}
                            type="text"
                            id="shop"
                            name="shop"
                            placeholder="Enter shop name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                            bg-gray-50 text-gray-800
                            focus:bg-white focus:outline-none focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500
                            transition duration-200"
                        />
                    </div>

                    {/* Product Type & People */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        {/* Product Type */}
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Product Type
                            </label>

                            <select
                                onChange={handleinputChange}
                                id="type"
                                name="type"
                                value={productData.type}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                bg-gray-50 text-gray-800
                                focus:bg-white focus:outline-none focus:ring-2
                                focus:ring-blue-500 focus:border-blue-500
                                transition duration-200"
                            >
                                <option value="" disabled>Select type</option>
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
                        </div>

                        {/* People */}
                        <div>
                            <label
                                htmlFor="people"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                For
                            </label>

                            <select
                                onChange={handleinputChange}
                                id="people"
                                name="people"
                                value={productData.people}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                bg-gray-50 text-gray-800
                                focus:bg-white focus:outline-none focus:ring-2
                                focus:ring-blue-500 focus:border-blue-500
                                transition duration-200"
                            >
                                <option value="" disabled>Select people</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>

                    </div>

                    {/* Price Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        {/* Original Price */}
                        <div>
                            <label
                                htmlFor="oriPrice"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Original Price
                            </label>

                            <div className="relative">
                                <span className="absolute left-4 top-3 text-gray-500">
                                    $
                                </span>

                                <input
                                    onChange={handleinputChange}
                                    type="number"
                                    id="oriPrice"
                                    name="oriPrice"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300
                                    rounded-xl bg-gray-50
                                    focus:bg-white focus:outline-none focus:ring-2
                                    focus:ring-blue-500 focus:border-blue-500
                                    transition duration-200"
                                />
                            </div>
                        </div>

                        {/* Discount Percent */}
                        <div>
                            <label
                                htmlFor="discountPercent"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Discount
                            </label>

                            <div className="relative">
                                <input
                                    onChange={handleinputChange}
                                    type="number"
                                    id="discountPercent"
                                    name="discountPercent"
                                    step="1"
                                    min="0"
                                    max="100"
                                    placeholder="0"
                                    className="w-full px-4 pr-10 py-3 border border-gray-300
                                    rounded-xl bg-gray-50
                                    focus:bg-white focus:outline-none focus:ring-2
                                    focus:ring-blue-500 focus:border-blue-500
                                    transition duration-200"
                                />

                                <span className="absolute right-4 top-3 text-gray-500">
                                    %
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Image */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Product Image URL
                        </label>

                        <input
                            onChange={handleinputChange}
                            type="text"
                            id="image"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                            bg-gray-50 text-gray-800
                            focus:bg-white focus:outline-none focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500
                            transition duration-200"
                        />

                        <p className="text-xs text-gray-400 mt-2">
                            Enter the URL of your product image
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600
                        hover:from-blue-700 hover:to-indigo-700
                        text-white font-bold py-3.5 rounded-xl
                        shadow-lg shadow-blue-200
                        hover:shadow-xl
                        active:scale-[0.98]
                        transition-all duration-200 mt-3"
                    >
                        + Create Product
                    </button>

                </div>

            </form>

        </div>
    )
}

export default Create
