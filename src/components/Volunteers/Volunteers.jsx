import React from "react";
import { Users, CheckCircle, Globe, Shield, Clock, Heart } from "lucide-react";

const VolunteerCard = ({ label, count, iconColor, trend, Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-indigo-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-indigo-900 text-lg">{label}</h3>
      <div className={`p-2 rounded-lg ${iconColor.bg}`}>
        <Icon className={`w-6 h-6 ${iconColor.text}`} />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-4xl font-bold text-indigo-900">
        {count.toLocaleString()}
      </span>
      {trend !== null && (
        <div
          className={`flex items-center text-sm font-medium ${
            trend > 0 ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      )}
    </div>
  </div>
);

export const Volunteers = () => {
  const stats = [
    {
      id: 1,
      label: "Active Volunteers",
      count: 856,
      iconColor: {
        bg: "bg-blue-100",
        text: "text-blue-600",
      },
      trend: 12,
      Icon: Users,
    },
    {
      id: 2,
      label: "Teams Deployed",
      count: 42,
      iconColor: {
        bg: "bg-green-100",
        text: "text-green-600",
      },
      trend: -5,
      Icon: CheckCircle,
    },
    {
      id: 3,
      label: "Available Volunteers",
      count: 234,
      iconColor: {
        bg: "bg-purple-100",
        text: "text-purple-600",
      },
      trend: 8,
      Icon: Globe,
    },
    {
      id: 4,
      label: "Training Completed",
      count: 678,
      iconColor: {
        bg: "bg-yellow-100",
        text: "text-yellow-600",
      },
      trend: 5,
      Icon: Shield,
    },
    {
      id: 5,
      label: "Pending Approvals",
      count: 19,
      iconColor: {
        bg: "bg-orange-100",
        text: "text-orange-600",
      },
      trend: -2,
      Icon: Clock,
    },
    {
      id: 6,
      label: "Emergency Responders",
      count: 123,
      iconColor: {
        bg: "bg-red-100",
        text: "text-red-600",
      },
      trend: 10,
      Icon: Heart,
    },
  ];

  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-900">
        👥 Volunteer Management
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stats.map((stat) => (
          <VolunteerCard
            key={stat.id}
            label={stat.label}
            count={stat.count}
            iconColor={stat.iconColor}
            trend={stat.trend}
            Icon={stat.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Volunteers;
