import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const increaseQuantity = (index) => {
        const newCart = [...cart];

        newCart[index].quantity += 1;

        setCart(newCart);
    };

    const decreaseQuantity = (index) => {
        const newCart = [...cart];

        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
        }

        setCart(newCart);
    };

    const removeProduct = (index) => {
        const newCart = cart.filter((_, i) => i !== index);

        setCart(newCart);
    };

    const clearCart = () => {
        setCart([]);
        setDiscount(0);

        localStorage.removeItem("cart");
    };

    const subtotal = cart.reduce(
        (total, product) => {
            return (
                total +
                Number(product.disPrice) *
                Number(product.quantity)
            );
        },
        0
    );

    const shipping =
        subtotal >= 50 || subtotal === 0
            ? 0
            : 5;

    const applyCoupon = () => {
        if (
            coupon.trim().toUpperCase() === "SAVE10"
        ) {
            setDiscount(subtotal * 0.10);
        } else {
            setDiscount(0);
            alert("Invalid coupon code");
        }
    };

    const total =
        subtotal +
        shipping -
        discount;

    // Get color class
    const getColorClass = (color) => {
        if (!color) {
            return "bg-gray-400";
        }

        switch (color.toLowerCase()) {
            case "black":
                return "bg-black";

            case "white":
                return "bg-white";

            case "pink":
                return "bg-pink-400";

            case "red":
                return "bg-red-500";

            case "blue":
                return "bg-blue-500";

            case "green":
                return "bg-green-500";

            case "yellow":
                return "bg-yellow-400";

            case "purple":
                return "bg-purple-500";

            case "orange":
                return "bg-orange-500";

            case "brown":
                return "bg-amber-800";

            case "gray":
            case "grey":
                return "bg-gray-500";

            default:
                return "bg-gray-400";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-6 py-12 text-center">

                    <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                        Shopping Cart
                    </h1>

                    <p className="mt-3 text-gray-500">
                        {cart.length}{" "}
                        {cart.length === 1
                            ? "item"
                            : "items"}{" "}
                        in your cart
                    </p>

                </div>
            </section>


            {/* Empty Cart */}
            {cart.length === 0 ? (

                <div className="mx-auto max-w-7xl px-6 py-20 text-center">

                    <div className="mb-6 text-7xl">
                        🛒
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">
                        Your cart is empty
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Looks like you haven't added
                        anything to your cart yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/product")
                        }
                        className="mt-8 rounded-lg bg-black px-8 py-3 text-white transition hover:bg-gray-800"
                    >
                        Continue Shopping
                    </button>

                </div>

            ) : (

                <div className="mx-auto max-w-7xl px-6 py-10">

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                        {/* LEFT SIDE */}
                        <div className="lg:col-span-2">

                            {/* Title */}
                            <div className="mb-5 flex items-center justify-between">

                                <h2 className="text-xl font-bold text-gray-900">
                                    Your Items
                                </h2>

                                <button
                                    onClick={clearCart}
                                    className="text-sm text-red-500 hover:text-red-700"
                                >
                                    Clear Cart
                                </button>

                            </div>


                            {/* Cart Products */}
                            <div className="space-y-5">

                                {cart.map(
                                    (product, index) => (

                                        <div
                                            key={`${product.id}-${product.size}-${product.color}-${index}`}
                                            className="flex flex-col gap-6 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row"
                                        >

                                            {/* Product Image */}
                                            <div className="h-56 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-52 sm:w-52">

                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-contain p-3 transition duration-300 hover:scale-105"
                                                />

                                            </div>


                                            {/* Product Information */}
                                            <div className="flex-1">

                                                {/* Name + Remove */}
                                                <div className="flex justify-between gap-4">

                                                    <div>

                                                        <p className="text-sm text-gray-500">
                                                            {product.shop}
                                                        </p>

                                                        <h3 className="mt-1 text-lg font-semibold text-gray-900">
                                                            {product.name}
                                                        </h3>

                                                    </div>


                                                    {/* Remove */}
                                                    <button
                                                        onClick={() =>
                                                            removeProduct(
                                                                index
                                                            )
                                                        }
                                                        className="text-xl text-gray-400 transition hover:text-red-500"
                                                        title="Remove product"
                                                    >
                                                        🗑
                                                    </button>

                                                </div>


                                                {/* Price */}
                                                <div className="mt-3 flex items-center gap-3">

                                                    <span className="text-lg font-bold text-gray-900">
                                                        $
                                                        {Number(
                                                            product.disPrice
                                                        ).toFixed(2)}
                                                    </span>

                                                    {Number(
                                                        product.oriPrice
                                                    ) >
                                                        Number(
                                                            product.disPrice
                                                        ) && (

                                                        <span className="text-sm text-gray-400 line-through">
                                                            $
                                                            {Number(
                                                                product.oriPrice
                                                            ).toFixed(
                                                                2
                                                            )}
                                                        </span>

                                                    )}

                                                </div>


                                                {/* Size + Color */}
                                                <div className="mt-4 flex flex-wrap gap-3">

                                                    {/* Size */}
                                                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">

                                                        <span className="text-xs font-medium text-gray-500">
                                                            Size
                                                        </span>

                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {product.size ||
                                                                "N/A"}
                                                        </span>

                                                    </div>


                                                    {/* Color */}
                                                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">

                                                        <span className="text-xs font-medium text-gray-500">
                                                            Color
                                                        </span>


                                                        {/* Color Circle */}
                                                        {product.color && (

                                                            <span
                                                                className={`h-4 w-4 rounded-full border border-gray-300 ${getColorClass(
                                                                    product.color
                                                                )}`}
                                                            ></span>

                                                        )}


                                                        {/* Color Name */}
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {product.color ||
                                                                "N/A"}
                                                        </span>

                                                    </div>

                                                </div>


                                                {/* Quantity + Item Total */}
                                                <div className="mt-5 flex items-center justify-between">

                                                    {/* Quantity */}
                                                    <div className="flex items-center overflow-hidden rounded-lg border">

                                                        <button
                                                            onClick={() =>
                                                                decreaseQuantity(
                                                                    index
                                                                )
                                                            }
                                                            className="px-4 py-2 transition hover:bg-gray-100"
                                                        >
                                                            −
                                                        </button>


                                                        <span className="border-x px-5 py-2 font-medium">
                                                            {
                                                                product.quantity
                                                            }
                                                        </span>


                                                        <button
                                                            onClick={() =>
                                                                increaseQuantity(
                                                                    index
                                                                )
                                                            }
                                                            className="px-4 py-2 transition hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>

                                                    </div>


                                                    {/* Item Total */}
                                                    <p className="font-bold text-gray-900">

                                                        $
                                                        {(
                                                            Number(
                                                                product.disPrice
                                                            ) *
                                                            Number(
                                                                product.quantity
                                                            )
                                                        ).toFixed(
                                                            2
                                                        )}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* Continue Shopping */}
                            <button
                                onClick={() =>
                                    navigate("/product")
                                }
                                className="mt-8 font-medium text-gray-700 transition hover:text-black"
                            >
                                ← Continue Shopping
                            </button>

                        </div>


                        {/* RIGHT SIDE */}
                        <div>

                            <div className="sticky top-6 rounded-2xl border bg-white p-6 shadow-sm">

                                <h2 className="mb-6 text-xl font-bold text-gray-900">
                                    Order Summary
                                </h2>


                                {/* Subtotal */}
                                <div className="mb-4 flex justify-between text-gray-600">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        $
                                        {subtotal.toFixed(
                                            2
                                        )}
                                    </span>

                                </div>


                                {/* Shipping */}
                                <div className="mb-4 flex justify-between text-gray-600">

                                    <span>
                                        Shipping
                                    </span>

                                    <span>
                                        {shipping ===
                                        0
                                            ? "FREE"
                                            : `$${shipping.toFixed(
                                                  2
                                              )}`}
                                    </span>

                                </div>


                                {/* Discount */}
                                {discount > 0 && (

                                    <div className="mb-4 flex justify-between text-green-600">

                                        <span>
                                            Discount
                                        </span>

                                        <span>
                                            -$
                                            {discount.toFixed(
                                                2
                                            )}
                                        </span>

                                    </div>

                                )}


                                {/* Total */}
                                <div className="flex justify-between border-t pt-5">

                                    <span className="text-lg font-bold">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold">
                                        $
                                        {total.toFixed(
                                            2
                                        )}
                                    </span>

                                </div>


                                {/* Coupon */}
                                <div className="mt-6">

                                    <p className="mb-2 text-sm font-medium">
                                        Have a coupon?
                                    </p>

                                    <div className="flex">

                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            value={
                                                coupon
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setCoupon(
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="flex-1 rounded-l-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                                        />

                                        <button
                                            onClick={
                                                applyCoupon
                                            }
                                            className="rounded-r-lg bg-gray-900 px-4 text-white hover:bg-black"
                                        >
                                            Apply
                                        </button>

                                    </div>

                                    <p className="mt-2 text-xs text-gray-400">
                                        Try: SAVE10
                                    </p>

                                </div>


                                {/* Checkout */}
                                <button
                                    onClick={() =>
                                        navigate(
                                            "/checkout"
                                        )
                                    }
                                    className="mt-6 w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Checkout →
                                </button>


                                {/* Shipping Information */}
                                <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">

                                    🚚 Free shipping on
                                    orders over $50

                                </div>


                                {/* Secure Checkout */}
                                <p className="mt-5 text-center text-xs text-gray-400">
                                    🔒 Secure checkout
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default CartPage;