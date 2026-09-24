import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const navigate = useNavigate();

    // =========================
    // Cart
    // =========================

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });


    // =========================
    // Customer Information
    // =========================

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        note: ""
    });


    // =========================
    // Payment Method
    // =========================

    const [paymentMethod, setPaymentMethod] =
        useState("qr");


    // =========================
    // Coupon
    // =========================

    const [discount, setDiscount] = useState(0);


    // =========================
    // Update Cart
    // =========================

    useEffect(() => {

        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCart(savedCart);

    }, []);


    // =========================
    // Form Change
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    };


    // =========================
    // Calculate Subtotal
    // =========================

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


    // =========================
    // Shipping
    // =========================

    const shipping =
        subtotal >= 50 || subtotal === 0
            ? 0
            : 5;


    // =========================
    // Total
    // =========================

    const total =
        subtotal +
        shipping -
        discount;


    // =========================
    // Place Order
    // =========================

    const handlePlaceOrder = (e) => {

        e.preventDefault();


        // Check customer information

        if (
            !form.firstName ||
            !form.lastName ||
            !form.phone ||
            !form.address ||
            !form.city
        ) {

            alert(
                "Please fill in all required information."
            );

            return;

        }


        // Check cart

        if (cart.length === 0) {

            alert("Your cart is empty.");

            navigate("/product");

            return;

        }


        // Generate Order Number

        const orderNumber =
            `TX-${Date.now()
                .toString()
                .slice(-8)}`;


        // Create Order

        const order = {

            orderNumber,

            items: cart,

            customer: {
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                address: form.address,
                city: form.city,
                note: form.note
            },

            paymentMethod:
                paymentMethod === "qr"
                    ? "QR Code Payment"
                    : "Cash on Delivery",

            subtotal,

            shipping,

            discount,

            total,

            createdAt:
                new Date().toISOString()

        };


        // Save order

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );


        // Clear Cart

        localStorage.removeItem("cart");


        // Go to success page

        navigate("/order-success");

    };


    // =========================
    // Empty Cart
    // =========================

    if (cart.length === 0) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

                <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-sm">

                    <div className="mb-5 text-6xl">
                        🛒
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Your Cart Is Empty
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Add some products before checking out.
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
                HEADER
            ========================= */}

            <section className="border-b bg-white">

                <div className="mx-auto max-w-7xl px-6 py-10">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Checkout
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Complete your order below.
                    </p>

                </div>

            </section>


            {/* =========================
                MAIN
            ========================= */}

            <div className="mx-auto max-w-7xl px-6 py-10">

                <form
                    onSubmit={handlePlaceOrder}
                    className="grid grid-cols-1 gap-8 lg:grid-cols-3"
                >


                    {/* =========================
                        LEFT SIDE
                    ========================= */}

                    <div className="space-y-6 lg:col-span-2">


                        {/* =========================
                            Customer Information
                        ========================= */}

                        <div className="rounded-2xl border bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold text-gray-900">
                                Delivery Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Enter your delivery information.
                            </p>


                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">


                                {/* First Name */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        First Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        placeholder="First name"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                                    />

                                </div>


                                {/* Last Name */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Last Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        placeholder="Last name"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                                    />

                                </div>


                                {/* Phone */}

                                <div className="sm:col-span-2">

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Phone Number *
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                                    />

                                </div>


                                {/* Address */}

                                <div className="sm:col-span-2">

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Address *
                                    </label>

                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="Enter your delivery address"
                                        rows="3"
                                        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                                    />

                                </div>


                                {/* City */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        City *
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                                    />

                                </div>


                                {/* Note */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Order Note
                                    </label>

                                    <input
                                        type="text"
                                        name="note"
                                        value={form.note}
                                        onChange={handleChange}
                                        placeholder="Optional"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* =========================
                            PAYMENT METHOD
                        ========================= */}

                        <div className="rounded-2xl border bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold text-gray-900">
                                Payment Method
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Choose how you want to pay.
                            </p>


                            {/* Payment Options */}

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">


                                {/* QR PAYMENT */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPaymentMethod("qr")
                                    }
                                    className={`rounded-xl border-2 p-4 text-left transition ${
                                        paymentMethod === "qr"
                                            ? "border-black bg-gray-50"
                                            : "border-gray-200 hover:border-gray-400"
                                    }`}
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-xl text-white">
                                            QR
                                        </div>

                                        <div>

                                            <p className="font-semibold text-gray-900">
                                                QR Code Payment
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Scan and pay
                                            </p>

                                        </div>

                                    </div>

                                </button>


                                {/* CASH */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPaymentMethod("cash")
                                    }
                                    className={`rounded-xl border-2 p-4 text-left transition ${
                                        paymentMethod === "cash"
                                            ? "border-black bg-gray-50"
                                            : "border-gray-200 hover:border-gray-400"
                                    }`}
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
                                            💵
                                        </div>

                                        <div>

                                            <p className="font-semibold text-gray-900">
                                                Cash on Delivery
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Pay when delivered
                                            </p>

                                        </div>

                                    </div>

                                </button>

                            </div>


                            {/* =========================
                                QR CODE
                            ========================= */}

                            {paymentMethod === "qr" && (

                                <div className="mt-6 rounded-2xl border bg-gray-50 p-6 text-center">


                                    <h3 className="text-lg font-bold text-gray-900">
                                        Scan to Pay
                                    </h3>


                                    <p className="mt-2 text-sm text-gray-500">
                                        Scan this QR code using your banking app.
                                    </p>


                                    {/* QR CODE */}

                                    <div className="mx-auto mt-6 flex h-96 w-96 max-w-full items-center justify-center rounded-2xl bg-white p-5 shadow-sm">

                                        <img
                                            src="/qr_code.png"
                                            alt="QR Code Payment"
                                            className="h-full w-fit object-contain rounded-lg"
                                        />

                                    </div>


                                    <p className="mt-5 text-sm font-medium text-gray-700">
                                        Amount to Pay
                                    </p>


                                    <p className="mt-1 text-3xl font-bold text-gray-900">
                                        ${total.toFixed(2)}
                                    </p>


                                    <p className="mt-3 text-xs text-gray-400">
                                        Please make sure the payment amount is correct.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* =========================
                        RIGHT SIDE
                    ========================= */}

                    <div>

                        <div className="sticky top-6 rounded-2xl border bg-white p-6 shadow-sm">


                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>


                            {/* Products */}

                            <div className="mt-6 space-y-4">

                                {cart.map(
                                    (product, index) => (

                                        <div
                                            key={`${product.id}-${index}`}
                                            className="flex gap-3"
                                        >

                                            {/* Image */}

                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">

                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-contain p-2"
                                                />

                                            </div>


                                            {/* Info */}

                                            <div className="min-w-0 flex-1">

                                                <p className="truncate font-semibold text-gray-900">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">

                                                    Size:{" "}
                                                    {product.size ||
                                                        "N/A"}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    Color:{" "}
                                                    {product.color ||
                                                        "N/A"}

                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">

                                                    Qty:{" "}
                                                    {product.quantity}

                                                </p>

                                            </div>


                                            {/* Price */}

                                            <p className="font-semibold text-gray-900">

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

                                    )
                                )}

                            </div>


                            {/* Divider */}

                            <div className="my-6 border-t"></div>


                            {/* Subtotal */}

                            <div className="mb-4 flex justify-between text-gray-600">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ${subtotal.toFixed(2)}
                                </span>

                            </div>


                            {/* Shipping */}

                            <div className="mb-4 flex justify-between text-gray-600">

                                <span>
                                    Shipping
                                </span>

                                <span>

                                    {shipping === 0
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

                                <span className="text-lg font-bold text-gray-900">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-gray-900">
                                    ${total.toFixed(2)}
                                </span>

                            </div>


                            {/* Place Order */}

                            <button
                                type="submit"
                                className="mt-6 w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
                            >
                                Place Order →
                            </button>


                            {/* Security */}

                            <p className="mt-5 text-center text-xs text-gray-400">
                                🔒 Secure checkout
                            </p>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default Checkout
