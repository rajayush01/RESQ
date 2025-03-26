import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import bg from "../../assets/avalanche.jpeg";
import bg9 from "../../assets/cyclone-2.jpg";
import bg6 from "../../assets/volcano.jpg";
import bg3 from "../../assets/cyclone-4.jpg";
import bg4 from "../../assets/cyclone.jpg";
import bg5 from "../../assets/earthquake.jpg";
import bg2 from "../../assets/flood.jpg";
import bg7 from "../../assets/landslides.jpg";
import bg8 from "../../assets/thunderstorm.jpg";
import bg1 from "../../assets/wildfire.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const images = [bg, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeOut(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically add authentication logic
    // For this example, we'll just route based on user type
    if (formData.userType === 'individual') {
      navigate('/DashboardIndividual');
    } else if (formData.userType === 'ngo') {
      navigate('/DashboardNGO');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    // Decide dashboard routing based on additional info from Google login
    // For now, defaulting to individual dashboard
    navigate('/DashboardIndividual');
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
  };

  const isFormValid = formData.email && formData.password && formData.userType;

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Image with Smooth Transition */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={images[currentImageIndex]}
            alt="Disaster Response Scenarios"
            className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              fadeOut ? "opacity-0" : "opacity-70"
            }`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/50 to-black opacity-90"></div>
        </motion.div>

        {/* Navbar */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-screen flex items-center justify-center ">
          <motion.div
            className="flex flex-col items-center gap-8 px-4 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Title Section */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-200 drop-shadow-lg">
              Welcome Back!
            </h1>
            <p className="-mt-5 text-lg md:text-xl text-gray-300">
              Log in to access your personalized dashboard.
            </p>

            {/* Login Card */}
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl  hover:shadow-white w-full max-w-md transition-transform duration-300 hover:scale-105 -mt-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Login</h2>
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <motion.div className="mb-5" whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-800 bg-white/80 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    whileFocus={{ scale: 1.03 }}
                  />
                </motion.div>

                {/* Password Input */}
                <motion.div className="mb-5" whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <motion.input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-800 bg-white/80 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    whileFocus={{ scale: 1.03 }}
                  />
                </motion.div>

                {/* User Type Select */}
                <motion.div className="mb-6" whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="userType"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Account Type
                  </label>
                  <motion.select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-800 bg-white/80 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    whileFocus={{ scale: 1.03 }}
                  >
                    <option value="">Select Account Type</option>
                    <option value="individual">Individual User</option>
                    <option value="ngo">NGO</option>
                  </motion.select>
                </motion.div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-lg font-semibold shadow-lg transition-all ${
                    isFormValid
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-indigo-500 hover:to-blue-500"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                  whileHover={isFormValid ? { scale: 1.05 } : {}}
                  whileTap={isFormValid ? { scale: 0.97 } : {}}
                  disabled={!isFormValid}
                >
                  Login
                </motion.button>
              </form>

              {/* Google Login Button */}
              <div className="mt-6 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    useOneTap
                    theme="filled_black"
                    shape="rectangular"
                    size="large"
                    text="continue_with"
                    width="100%"
                  />
                </motion.div>
              </div>

              {/* Signup Link */}
              <p className="text-center text-sm text-gray-400 mt-6">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-indigo-400 hover:text-indigo-300 transition duration-200"
                >
                  Sign Up
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;