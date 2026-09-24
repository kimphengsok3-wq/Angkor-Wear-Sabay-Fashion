import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [productData, setProductData] = useState({
        name: "",
        shop: "",
        type: "",
        people: "",
        oriPrice: "",
        discountPercent: "",
        image: ""
    });

    // Check admin login
    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");

        if (isAdmin !== "true") {
            navigate("/admin/login");
        }
    }, [navigate]);

    // Get products
    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const res = await fetch(
                "http://localhost:8000/products"
            );

            const data = await res.json();

            setProducts(data);
        } catch (error) {
            console.error(error);
            alert("Cannot load products.");
        }
    }

    // Input change
    function handleInputChange(e) {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    }

    // Open Add Product form
    function handleAddProduct() {
        setEditingProduct(null);

        setProductData({
            name: "",
            shop: "",
            type: "",
            people: "",
            oriPrice: "",
            discountPercent: "",
            image: ""
        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Open Edit Product form
    function handleEdit(product) {
        setEditingProduct(product);

        setProductData({
            name: product.name || "",
            shop: product.shop || "",
            type: product.type || "",
            people: product.people || "",
            oriPrice: product.oriPrice || "",
            discountPercent: product.discountPercent || "",
            image: product.image || ""
        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Cancel form
    function handleCancel() {
        setShowForm(false);
        setEditingProduct(null);

        setProductData({
            name: "",
            shop: "",
            type: "",
            people: "",
            oriPrice: "",
            discountPercent: "",
            image: ""
        });
    }

    // Add / Update Product
    async function handleSubmit(e) {
        e.preventDefault();

        if (
            productData.name === "" ||
            productData.shop === "" ||
            productData.type === "" ||
            productData.people === "" ||
            productData.oriPrice === "" ||
            productData.discountPercent === "" ||
            productData.image === ""
        ) {
            alert("Please fill in all information!");
            return;
        }

        const oriPrice = Number(productData.oriPrice);
        const discountPercent = Number(
            productData.discountPercent
        );

        const disPrice =
            oriPrice -
            (oriPrice * discountPercent) / 100;

        const product = {
            name: productData.name,
            shop: productData.shop,
            type: productData.type,
            people: productData.people,
            oriPrice: oriPrice,
            discountPercent: discountPercent,
            disPrice: Number(disPrice.toFixed(2)),
            image: productData.image
        };

        try {
            // EDIT
            if (editingProduct) {
                const res = await fetch(
                    `http://localhost:8000/products/${editingProduct.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(product)
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to update product");
                }

                alert("Product updated successfully!");
            }

            // ADD
            else {
                const res = await fetch(
                    "http://localhost:8000/products",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(product)
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to add product");
                }

                alert("Product added successfully!");
            }

            handleCancel();

            fetchProducts();
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    }

    // Delete product
    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const res = await fetch(
                `http://localhost:8000/products/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete product");
            }

            // Remove the deleted product from the current list
            setProducts(prevProducts =>
                prevProducts.filter(
                    product => String(product.id) !== String(id)
                )
            );

            alert("Product deleted successfully!");

        } catch (error) {
            console.error("Delete error:", error);
            alert("Cannot delete product.");
        }
    }

    // Logout
    function handleLogout() {
        localStorage.removeItem("isAdmin");
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>
                            <h1 className="text-3xl font-bold">
                                Admin Products
                            </h1>

                            <p className="mt-1 text-gray-400">
                                Add, edit and manage your products
                            </p>
                        </div>

                        <div className="flex items-center gap-3">

                            

                            <button
                                onClick={handleLogout}
                                className="rounded-xl bg-gray-700 px-5 py-3 font-semibold text-white transition hover:bg-gray-600"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>
            </div>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Add / Edit Form */}
                {showForm && (
                    <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-7 text-white">

                            <h2 className="text-3xl font-bold">
                                {editingProduct
                                    ? "Edit Product"
                                    : "Add New Product"}
                            </h2>

                            <p className="mt-2 text-blue-100">
                                {editingProduct
                                    ? "Update the product information below"
                                    : "Add a new product to your store"}
                            </p>

                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-8 space-y-6"
                        >

                            {/* Product Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter product name"
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Shop */}
                            <div>
                                <label
                                    htmlFor="shop"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Shop
                                </label>

                                <input
                                    type="text"
                                    id="shop"
                                    name="shop"
                                    value={productData.shop}
                                    onChange={handleInputChange}
                                    placeholder="Enter shop name"
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Product Type + People */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                {/* Product Type */}
                                <div>
                                    <label
                                        htmlFor="type"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Product Type
                                    </label>

                                    <select
                                        id="type"
                                        name="type"
                                        value={productData.type}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">
                                            Select product type
                                        </option>

                                        <option value="shirt">
                                            Shirt
                                        </option>

                                        <option value="pant">
                                            Pant
                                        </option>

                                        <option value="shoe">
                                            Shoe
                                        </option>

                                        <option value="hat">
                                            Hat
                                        </option>

                                        <option value="jacket">
                                            Jacket
                                        </option>

                                        <option value="dress">
                                            Dress
                                        </option>

                                        <option value="short">
                                            Short
                                        </option>

                                        <option value="skirt">
                                            Skirt
                                        </option>

                                        <option value="accessory">
                                            Accessory
                                        </option>
                                    </select>
                                </div>

                                {/* People */}
                                <div>
                                    <label
                                        htmlFor="people"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        For
                                    </label>

                                    <select
                                        id="people"
                                        name="people"
                                        value={productData.people}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">
                                            Select people
                                        </option>

                                        <option value="men">
                                            Men
                                        </option>

                                        <option value="women">
                                            Women
                                        </option>

                                        <option value="kids">
                                            Kids
                                        </option>
                                    </select>
                                </div>

                            </div>

                            {/* Price + Discount */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                {/* Original Price */}
                                <div>
                                    <label
                                        htmlFor="oriPrice"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Original Price
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                            $
                                        </span>

                                        <input
                                            type="number"
                                            id="oriPrice"
                                            name="oriPrice"
                                            value={productData.oriPrice}
                                            onChange={handleInputChange}
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-8 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                        />

                                    </div>
                                </div>

                                {/* Discount */}
                                <div>
                                    <label
                                        htmlFor="discountPercent"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Discount
                                    </label>

                                    <div className="relative">

                                        <input
                                            type="number"
                                            id="discountPercent"
                                            name="discountPercent"
                                            value={
                                                productData.discountPercent
                                            }
                                            onChange={handleInputChange}
                                            min="0"
                                            max="100"
                                            step="1"
                                            placeholder="0"
                                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                        />

                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                                            %
                                        </span>

                                    </div>
                                </div>

                            </div>

                            {/* Discount Price Preview */}
                            {productData.oriPrice !== "" && (
                                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                                    <p className="text-sm font-medium text-blue-600">
                                        Discount Price
                                    </p>

                                    <p className="mt-1 text-3xl font-bold text-blue-700">
                                        $
                                        {(
                                            Number(
                                                productData.oriPrice
                                            ) -
                                            (
                                                Number(
                                                    productData.oriPrice
                                                ) *
                                                Number(
                                                    productData.discountPercent || 0
                                                )
                                            ) /
                                            100
                                        ).toFixed(2)}
                                    </p>

                                </div>
                            )}

                            {/* Image URL */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Product Image URL
                                </label>

                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={productData.image}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                                />

                                <p className="mt-2 text-xs text-gray-400">
                                    Enter the URL of your product image
                                </p>
                            </div>

                            {/* Image Preview */}
                            {productData.image && (
                                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

                                    <p className="mb-4 text-sm font-semibold text-gray-700">
                                        Image Preview
                                    </p>

                                    <div className="flex justify-center">

                                        <img
                                            src={productData.image}
                                            alt="Product Preview"
                                            className="h-64 w-64 rounded-xl border border-gray-200 bg-white object-contain p-3"
                                        />

                                    </div>

                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex flex-col gap-4 pt-3 sm:flex-row">

                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98]"
                                >
                                    {editingProduct
                                        ? "Update Product"
                                        : "+ Add Product"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="rounded-xl bg-gray-100 px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-200 sm:w-40"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>
                    </div>
                )}

                {/* Product List Header */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Products
                        </h2>

                        <p className="mt-1 text-gray-500">
                            {products.length} products in your store
                        </p>
                    </div>

                    {!showForm && (
                        <button
                            onClick={handleAddProduct}
                            className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
                        >
                            + Add New Product
                        </button>
                    )}

                </div>

                {/* Product List */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >

                            {/* Image */}
                            <div className="relative flex h-72 items-center justify-center bg-gray-100 p-5">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-contain"
                                />

                                {Number(product.discountPercent) > 0 && (
                                    <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                                        -{product.discountPercent}%
                                    </span>
                                )}

                            </div>

                            {/* Information */}
                            <div className="p-6">

                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    {product.shop}
                                </p>

                                <h3 className="mt-2 line-clamp-2 text-xl font-bold text-gray-900">
                                    {product.name}
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-2">

                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
                                        {product.type}
                                    </span>

                                    <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold capitalize text-purple-600">
                                        {product.people}
                                    </span>

                                </div>

                                {/* Price */}
                                <div className="mt-5 flex items-center gap-3">

                                    <span className="text-2xl font-bold text-gray-900">
                                        $
                                        {Number(
                                            product.disPrice
                                        ).toFixed(2)}
                                    </span>

                                    {Number(product.oriPrice) >
                                        Number(product.disPrice) && (
                                        <span className="text-sm text-gray-400 line-through">
                                            $
                                            {Number(
                                                product.oriPrice
                                            ).toFixed(2)}
                                        </span>
                                    )}

                                </div>

                                {/* Buttons */}
                                <div className="mt-6 flex gap-3">

                                    <button
                                        onClick={() =>
                                            handleEdit(product)
                                        }
                                        className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(product.id)
                                        }
                                        className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Empty Products */}
                {products.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center">

                        <div className="text-6xl">
                            📦
                        </div>

                        <h3 className="mt-5 text-2xl font-bold text-gray-900">
                            No Products Yet
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Add your first product to your store.
                        </p>

                        <button
                            onClick={handleAddProduct}
                            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            + Add Product
                        </button>

                    </div>
                )}

            </main>
        </div>
    );
}

export default AdminProducts;