import React from "react";
import { motion } from "framer-motion";

export const Resources = () => {
  const resources = [
    {
      id: 1,
      name: "Medical Supplies",
      quantity: 500,
      location: "Warehouse A",
      status: "Available",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      id: 2,
      name: "Food Packages",
      quantity: 300,
      location: "Warehouse B",
      status: "Low Stock",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    {
      id: 3,
      name: "Water Bottles",
      quantity: 1000,
      location: "Warehouse C",
      status: "Available",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      id: 4,
      name: "Tents",
      quantity: 150,
      location: "Warehouse D",
      status: "Out of Stock",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    },
    {
      id: 5,
      name: "Blankets",
      quantity: 200,
      location: "Warehouse E",
      status: "Available",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      id: 6,
      name: "Sanitary Kits",
      quantity: 120,
      location: "Warehouse F",
      status: "Low Stock",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    {
      id: 7,
      name: "Flashlights",
      quantity: 50,
      location: "Warehouse G",
      status: "Out of Stock",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    },
    {
      id: 9,
      name: "Batteries",
      quantity: 600,
      location: "Warehouse I",
      status: "Low Stock",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    {
      id: 10,
      name: "Clothing Kits",
      quantity: 400,
      location: "Warehouse J",
      status: "Available",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
        📦 Resource Management
      </h2>
      <motion.div
        className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Mobile View (Responsive Cards) */}
        <div className="block md:hidden space-y-4">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              className="bg-white border rounded-lg shadow-sm p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{resource.name}</h3>
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${resource.bgColor} ${resource.textColor}`}
                >
                  {resource.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div>Quantity:</div>
                <div>{resource.quantity}</div>
                <div>Location:</div>
                <div>{resource.location}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View (Table) */}
        <motion.table
          className="w-full table-fixed divide-y divide-gray-200 hidden md:table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-blue-200 to-blue-100">
            <tr>
              {["Resource Name", "Quantity", "Location", "Status"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-100">
            {resources.map((resource, index) => (
              <motion.tr
                key={resource.id}
                className="hover:bg-blue-50 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <td className="px-4 sm:px-6 py-4 text-gray-800 text-xs sm:text-sm">{resource.name}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-700 text-xs sm:text-sm">{resource.quantity}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-700 text-xs sm:text-sm">{resource.location}</td>
                <td className="px-4 sm:px-6 py-4">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${resource.bgColor} ${resource.textColor}`}
                  >
                    {resource.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </motion.div>
    </div>
  );
};

export default Resources;