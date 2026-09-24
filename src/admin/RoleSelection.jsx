import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-4xl">

                {/* Logo / Brand */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Sabay Fashion
                    </h1>

                    <p className="mt-3 text-gray-500 text-lg">
                        Welcome to our fashion store
                    </p>

                    <p className="mt-2 text-gray-400">
                        Please select how you want to continue
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* User */}
                    <button
                        onClick={() => navigate("/home")}
                        className="group rounded-3xl border border-gray-200 bg-white p-8 text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-5xl transition duration-300 group-hover:scale-110">
                            🛍️
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-900">
                            User
                        </h2>

                        <p className="mt-3 leading-7 text-gray-500">
                            Browse our products, add items to your cart,
                            save your favorite products, and place orders.
                        </p>

                        <div className="mt-8 inline-flex items-center rounded-xl bg-black px-6 py-3 font-semibold text-white transition group-hover:bg-gray-800">
                            Continue as User
                            <span className="ml-2 transition group-hover:translate-x-1">
                                →
                            </span>
                        </div>
                    </button>

                    {/* Admin */}
                    <button
                        onClick={() => navigate("/admin/login")}
                        className="group rounded-3xl border border-gray-200 bg-white p-8 text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-5xl transition duration-300 group-hover:scale-110">
                            🔐
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-900">
                            Admin
                        </h2>

                        <p className="mt-3 leading-7 text-gray-500">
                            Manage your store products, including adding,
                            editing, and deleting products.
                        </p>

                        <div className="mt-8 inline-flex items-center rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition group-hover:bg-black">
                            Continue as Admin
                            <span className="ml-2 transition group-hover:translate-x-1">
                                →
                            </span>
                        </div>
                    </button>

                </div>

                {/* Footer */}
                <p className="mt-10 text-center text-sm text-gray-400">
                    © 2026 Sabay Fashion. All rights reserved.
                </p>

            </div>
        </div>
    );
}

export default RoleSelection;