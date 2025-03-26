import { AlertTriangle, ShieldAlert, CloudLightning, Sun, Wind } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: "Flood Warning",
      description: "Chennai, Tamil Nadu - Severe flooding expected in low-lying areas",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-500",
      Icon: AlertTriangle,
    },
    {
      id: 2,
      type: "Storm Alert",
      description: "Mumbai, Maharashtra - Heavy rainfall predicted",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-500",
      Icon: CloudLightning,
    },
    {
      id: 3,
      type: "Heat Wave",
      description: "Jaipur, Rajasthan - Extremely high temperatures expected",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-500",
      Icon: Sun,
    },
    {
      id: 4,
      type: "Cyclone Alert",
      description: "Kolkata, West Bengal - Cyclone moving towards coastal regions",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-500",
      Icon: Wind,
    },
    {
      id: 5,
      type: "Landslide Warning",
      description: "Shillong, Meghalaya - Risk of landslides due to heavy rainfall",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-500",
      Icon: ShieldAlert,
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br rounded-xl from-blue-100 to-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🌩️ Alert Management
      </h2>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              className={`p-5 border-l-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer ${alert.bgColor} ${alert.borderColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-start">
                <alert.Icon className={`w-8 h-8 mr-3 ${alert.iconColor}`} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{alert.type}</h3>
                  <p className="text-gray-600 mt-1">{alert.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
