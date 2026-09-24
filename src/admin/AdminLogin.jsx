import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // Simple password for school project
    const ADMIN_PASSWORD = "admin123";

    function handleLogin(e) {
        e.preventDefault();

        if (password === ADMIN_PASSWORD) {
            setError("");

            // Save admin login status
            localStorage.setItem("isAdmin", "true");

            navigate("/admin/products");
        } else {
            setError("Incorrect password. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 text-sm font-medium text-gray-500 transition hover:text-black"
                >
                    ← Back
                </button>

                {/* Login Card */}
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">

                    {/* Icon */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
                        🔐
                    </div>

                    {/* Title */}
                    <div className="mt-6 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Admin Login
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Enter your password to manage products.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="mt-8">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Admin Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-black"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-xl bg-black py-3.5 font-semibold text-white transition hover:bg-gray-800"
                        >
                            Login
                        </button>

                    </form>

                    

                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    Sabay Fashion Admin
                </p>

            </div>
        </div>
    );
}

export default AdminLogin;