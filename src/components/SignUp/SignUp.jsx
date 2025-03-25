import React, { useState } from "react";
import { motion } from "framer-motion";
import signupBg from "../../assets/login.jpg";
import Navbar from "../Navbar/Navbar";

const Signup = () => {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        password: "", 
        userType: "" 
    });

    // Update form data state on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Check if all fields are filled
    const isFormValid = formData.name && formData.email && formData.password && formData.userType;

    return (
        <div
            className="relative flex flex-col min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${signupBg})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-white opacity-5"></div>

            {/* Navbar */}
            <div className="z-50"><Navbar /></div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center px-4 -mt-10">
                <div className="flex flex-col items-center gap-6 text-white mb-8 z-50">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-200 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] shadow-black">
                        Welcome to Our Community!
                    </h1>
                    <p className="text-center text-gray-300">
                        Create an account and start exploring our platform. We're excited to
                        have you onboard.
                    </p>
                </div>

                {/* Signup Card */}
                <motion.div
                    className="relative bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        Create Your Account
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-white text-sm font-semibold mb-2"
                            >
                                Name
                            </label>
                            <motion.input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 text-gray-800 bg-white bg-opacity-30 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                whileFocus={{ scale: 1.03 }}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-white text-sm font-semibold mb-2"
                            >
                                Email
                            </label>
                            <motion.input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 text-gray-800 bg-white bg-opacity-30 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                whileFocus={{ scale: 1.03 }}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-white text-sm font-semibold mb-2"
                            >
                                Password
                            </label>
                            <motion.input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 text-gray-800 bg-white bg-opacity-30 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                whileFocus={{ scale: 1.03 }}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="userType"
                                className="block text-white text-sm font-semibold mb-2"
                            >
                                Account Type
                            </label>
                            <motion.select
                                id="userType"
                                name="userType"
                                value={formData.userType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 text-gray-800 bg-white bg-opacity-30 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                whileFocus={{ scale: 1.03 }}
                            >
                                <option value="">Select Account Type</option>
                                <option value="individual">Individual User</option>
                                <option value="ngo">NGO</option>
                            </motion.select>
                        </div>
                        <motion.button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-lg font-semibold shadow-lg focus:outline-none transition-all ${isFormValid
                                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-blue-500 hover:to-indigo-500"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                            whileHover={isFormValid ? { scale: 1.03 } : {}}
                            whileTap={isFormValid ? { scale: 0.97 } : {}}
                            disabled={!isFormValid}
                        >
                            Sign Up
                        </motion.button>
                    </form>
                    <p className="text-center text-gray-400 text-xs mt-4">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-indigo-300 hover:text-indigo-200 transition duration-200"
                        >
                            Login
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;