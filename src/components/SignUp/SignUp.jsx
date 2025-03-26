import React, { useState, useEffect } from "react";
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

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  // Update form data state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically add user registration logic
    // For this example, we'll just route based on user type
    if (formData.userType === 'individual') {
      navigate('/DashboardIndividual');
    } else if (formData.userType === 'ngo') {
      navigate('/DashboardNGO');
    }
  };

  // Check if all fields are filled
  const isFormValid =
    formData.name && formData.email && formData.password && formData.userType;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Smooth Transition */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ scale: [1, 1.1, 1] }}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/50 to-black opacity-90"></div>
      </motion.div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4 sm:px-8 lg:px-16">
        {/* Title Section */}
        <motion.div
          className="flex flex-col justify-center items-center gap-6 text-white mb-8 z-50"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-200 drop-shadow-lg text-center">
            Join Our Community!
          </h1>
          <p className="text-center text-gray-300 text-base sm:text-lg max-w-lg -mt-5 -mb-5">
            Create an account and explore our disaster management platform. We
            can't wait to have you onboard!
          </p>
        </motion.div>

        {/* Signup Card */}
        <motion.div
          className="relative bg-white/20 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-white transition-transform duration-300 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileHover={{ y: -5 }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Input Fields */}
            {["name", "email", "password"].map((field) => (
              <motion.div
                key={field}
                className="mb-4"
                whileHover={{ scale: 1.03 }}
              >
                <label
                  htmlFor={field}
                  className="block text-white text-sm font-semibold mb-2"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <motion.input
                  type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-800 bg-white/80 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  whileFocus={{ scale: 1.03 }}
                />
              </motion.div>
            ))}

            {/* Account Type Select */}
            <motion.div className="mb-6" whileHover={{ scale: 1.03 }}>
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
                className="w-full px-4 py-2 text-gray-800 bg-white/80 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                whileFocus={{ scale: 1.03 }}
              >
                <option value="">Select Account Type</option>
                <option value="individual">Individual User</option>
                <option value="ngo">NGO</option>
              </motion.select>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-semibold shadow-lg focus:outline-none transition-all ${
                isFormValid
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white hover:from-indigo-500 hover:to-blue-500"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
              whileHover={isFormValid ? { scale: 1.05 } : {}}
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