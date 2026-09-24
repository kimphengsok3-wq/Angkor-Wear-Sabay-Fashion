import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    // =========================
    // Get Last Order
    // =========================

    useEffect(() => {

        const savedOrder =
            JSON.parse(
                localStorage.getItem("lastOrder")
            );

        setOrder(savedOrder);

    }, []);


    // =========================
    // Color Class
    // =========================

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


    // =========================
    // Generate Order Number
    // =========================

    const orderNumber =
        order?.orderNumber ||
        `TX-${Date.now().toString().slice(-8)}`;


    // =========================
    // Calculate Values
    // =========================

    const items = order?.items || [];

    const subtotal =
        order?.subtotal ??
        items.reduce(
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
        order?.shipping ??
        (subtotal >= 50 ? 0 : 5);


    const discount =
        order?.discount ?? 0;


    const total =
        order?.total ??
        subtotal +
        shipping -
        discount;


    // =========================
    // Delivery Date
    // =========================

    const getDeliveryDate = () => {

        const start = new Date();

        start.setDate(
            start.getDate() + 3
        );

        const end = new Date();

        end.setDate(
            end.getDate() + 7
        );

        const options = {
            month: "short",
            day: "numeric",
            year: "numeric"
        };

        return `${start.toLocaleDateString(
            "en-US",
            options
        )} - ${end.toLocaleDateString(
            "en-US",
            options
        )}`;

    };


    // =========================
    // No Order
    // =========================

    if (!order) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

                <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-sm">

                    <div className="mb-5 text-6xl">
                        📦
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        No Order Found
                    </h1>

                    <p className="mt-3 text-gray-500">
                        We couldn't find your recent order.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/product")
                        }
                        className="mt-7 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-gray-50">


            {/* =========================
                SUCCESS HEADER
            ========================= */}

            <section className="border-b bg-white">

                <div className="mx-auto max-w-4xl px-6 py-14 text-center">


                    {/* Success Icon */}

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

                        <span className="text-4xl text-green-600">
                            ✓
                        </span>

                    </div>


                    {/* Title */}

                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">

                        Order Placed Successfully!

                    </h1>


                    <p className="mx-auto mt-3 max-w-xl text-gray-500">

                        Thank you for your purchase.
                        Your order has been received and
                        is now being processed.

                    </p>


                    {/* Order Number */}

                    <div className="mt-5">

                        <span className="text-sm text-gray-500">
                            Order Number
                        </span>

                        <p className="mt-1 font-bold text-gray-900">
                            #{orderNumber}
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <div className="mx-auto max-w-4xl px-6 py-10">


                {/* =========================
                    Delivery Information
                ========================= */}

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">


                        {/* Delivery */}

                        <div className="flex items-start gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
                                🚚
                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Estimated Delivery
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {getDeliveryDate()}
                                </p>

                            </div>

                        </div>


                        {/* Payment */}

                        <div className="flex items-start gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
                                💳
                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Payment
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {order.paymentMethod ||
                                        "Cash / Card"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    Order Items
                ========================= */}

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">


                    <div className="flex items-center justify-between">

                        <h2 className="text-xl font-bold text-gray-900">
                            Order Summary
                        </h2>

                        <span className="text-sm text-gray-500">
                            {items.length}{" "}
                            {items.length === 1
                                ? "item"
                                : "items"}
                        </span>

                    </div>


                    {/* Products */}

                    <div className="mt-6 space-y-5">

                        {items.map(
                            (product, index) => (

                                <div
                                    key={`${product.id}-${product.size}-${product.color}-${index}`}
                                    className="flex gap-4 border-b pb-5 last:border-b-0 last:pb-0"
                                >


                                    {/* Image */}

                                    <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-contain p-2"
                                        />

                                    </div>


                                    {/* Product Info */}

                                    <div className="flex flex-1 flex-col justify-between">

                                        <div className="flex justify-between gap-4">

                                            <div>

                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                    {product.shop}
                                                </p>

                                                <h3 className="mt-1 font-semibold text-gray-900">
                                                    {product.name}
                                                </h3>

                                            </div>


                                            {/* Price */}

                                            <p className="font-bold text-gray-900">

                                                $
                                                {(
                                                    Number(
                                                        product.disPrice
                                                    ) *
                                                    Number(
                                                        product.quantity
                                                    )
                                                ).toFixed(2)}

                                            </p>

                                        </div>


                                        {/* Size + Color */}

                                        <div className="mt-3 flex flex-wrap items-center gap-3">


                                            {/* Size */}

                                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5">

                                                <span className="text-xs text-gray-500">
                                                    Size
                                                </span>

                                                <span className="text-sm font-semibold text-gray-900">
                                                    {product.size ||
                                                        "N/A"}
                                                </span>

                                            </div>


                                            {/* Color */}

                                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5">

                                                <span className="text-xs text-gray-500">
                                                    Color
                                                </span>


                                                <span
                                                    className={`h-4 w-4 rounded-full border border-gray-300 ${getColorClass(
                                                        product.color
                                                    )}`}
                                                ></span>


                                                <span className="text-sm font-semibold text-gray-900">
                                                    {product.color ||
                                                        "N/A"}
                                                </span>

                                            </div>


                                            {/* Quantity */}

                                            <span className="text-sm text-gray-500">
                                                Qty:{" "}
                                                {product.quantity}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>


                {/* =========================
                    Price Summary
                ========================= */}

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold text-gray-900">
                        Payment Summary
                    </h2>


                    <div className="mt-6 space-y-4">


                        {/* Subtotal */}

                        <div className="flex justify-between text-gray-600">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                ${Number(subtotal).toFixed(2)}
                            </span>

                        </div>


                        {/* Shipping */}

                        <div className="flex justify-between text-gray-600">

                            <span>
                                Shipping
                            </span>

                            <span>

                                {Number(shipping) === 0
                                    ? "FREE"
                                    : `$${Number(
                                          shipping
                                      ).toFixed(2)}`}

                            </span>

                        </div>


                        {/* Discount */}

                        {Number(discount) > 0 && (

                            <div className="flex justify-between text-green-600">

                                <span>
                                    Discount
                                </span>

                                <span>
                                    -$
                                    {Number(
                                        discount
                                    ).toFixed(2)}
                                </span>

                            </div>

                        )}


                        {/* Total */}

                        <div className="flex justify-between border-t pt-5">

                            <span className="text-lg font-bold text-gray-900">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-gray-900">
                                $
                                {Number(total).toFixed(2)}
                            </span>

                        </div>

                    </div>

                </div>


                {/* =========================
                    What's Next
                ========================= */}

                <div className="mt-6 rounded-2xl bg-gray-900 p-6 text-white">

                    <h2 className="text-xl font-bold">
                        What happens next?
                    </h2>


                    <div className="mt-6 grid gap-5 sm:grid-cols-3">


                        <div>

                            <div className="text-2xl">
                                📦
                            </div>

                            <h3 className="mt-2 font-semibold">
                                Order Processing
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                We're preparing your items.
                            </p>

                        </div>


                        <div>

                            <div className="text-2xl">
                                🚚
                            </div>

                            <h3 className="mt-2 font-semibold">
                                On the Way
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                Your package will be shipped.
                            </p>

                        </div>


                        <div>

                            <div className="text-2xl">
                                🏠
                            </div>

                            <h3 className="mt-2 font-semibold">
                                Delivered
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                Enjoy your new clothes!
                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                    Buttons
                ========================= */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">


                    {/* Continue Shopping */}

                    <button
                        onClick={() =>
                            navigate("/product")
                        }
                        className="flex-1 rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Continue Shopping
                    </button>


                    {/* Home */}

                    <button
                        onClick={() =>
                            navigate("/home")
                        }
                        className="flex-1 rounded-xl border-2 border-black bg-white py-4 font-semibold text-black transition hover:bg-black hover:text-white"
                    >
                        Back to Home
                    </button>

                </div>


                {/* Footer Message */}

                <p className="mt-8 text-center text-sm text-gray-400">

                    Thank you for shopping with us ❤️

                </p>

            </div>

        </div>

    );
}

export default OrderSuccess