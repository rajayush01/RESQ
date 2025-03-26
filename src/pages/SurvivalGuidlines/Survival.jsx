import React from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Compass,
  Map,
  Users,
  LifeBuoy,
  CloudRain,
  Flame,
  Globe,
  LogIn,
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavSurvival from '../../components/Navbar/NavSurvival';


const Survival = () => {
  const navigate = useNavigate();

  const guides = [
    {
      id: 1,
      title: 'Emergency Essentials',
      icon: <ShieldAlert className="w-10 h-10 text-blue-600" />,
      description:
        'Prepare a survival kit with non-perishable food, water, flashlights, and extra batteries. Ensure you have blankets, first-aid supplies, and important documents in waterproof bags.',
    },
    {
      id: 2,
      title: 'Emergency Communication',
      icon: <PhoneCall className="w-10 h-10 text-green-600" />,
      description:
        'Keep a list of emergency contacts. Have a fully charged mobile phone with a power bank, and consider using walkie-talkies for short-distance communication during network outages.',
    },
    {
      id: 3,
      title: 'Natural Disaster Preparedness',
      icon: <Compass className="w-10 h-10 text-yellow-600" />,
      description:
        'Identify safe zones in your home. Be prepared for floods, earthquakes, and storms by knowing evacuation routes. Stay informed via weather alerts and local authorities.',
    },
    {
      id: 4,
      title: 'Survival Gear Checklist',
      icon: <LifeBuoy className="w-10 h-10 text-red-600" />,
      description:
        'Pack essential gear like a multi-tool, flashlight, whistle, and waterproof clothing. Include a portable water filter and energy bars for sustenance in case of prolonged emergencies.',
    },
    {
      id: 5,
      title: 'Evacuation Plan',
      icon: <Map className="w-10 h-10 text-purple-600" />,
      description:
        'Map out safe evacuation routes in your locality. Identify nearby shelters and meeting points. Practice evacuation drills with your family to ensure everyone knows the plan.',
    },
    {
      id: 6,
      title: 'Community Support',
      icon: <Users className="w-10 h-10 text-indigo-600" />,
      description:
        'Stay connected with your neighbors and community. Participate in local emergency preparedness programs and volunteer to assist others during disasters.',
    },
    {
      id: 7,
      title: 'Flood Safety Tips',
      icon: <CloudRain className="w-10 h-10 text-blue-500" />,
      description:
        'Move to higher ground immediately in case of flooding. Avoid walking or driving through floodwaters and stay updated through local weather alerts.',
    },
    {
      id: 8,
      title: 'Earthquake Safety Guidelines',
      icon: <Globe className="w-10 h-10 text-gray-700" />,
      description:
        'During an earthquake, drop to the ground, cover your head, and hold on until the shaking stops. Avoid doorways and stay away from windows and heavy objects.',
    },
    {
      id: 9,
      title: 'Wildfire Precautions',
      icon: <Flame className="w-10 h-10 text-orange-500" />,
      description:
        'If you\'re in a wildfire-prone area, create a safety zone around your home. Follow evacuation orders immediately and wear protective gear if needed.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Navbar */}
      <NavSurvival/>

      {/* Main Content */}
      <div className="p-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-blue-700 drop-shadow-md">
            Survival Guidance
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Comprehensive tips to stay safe during emergencies and natural
            disasters.
          </p>
        </motion.div>

        {/* Guides Section */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { delay: 0.3, duration: 0.8, staggerChildren: 0.2 },
            },
          }}
        >
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-full bg-blue-100">{guide.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {guide.title}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{guide.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold text-indigo-700 drop-shadow-md">
            Stay Prepared, Stay Safe!
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Always have a plan and keep your emergency contacts updated.
          </p>
          <motion.button
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-5 bg-blue-900 text-white text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ResQ Platform.</p>
        <p className="text-xs">All rights reserved.</p>
      </div>
    </div>
  );
};

export default Survival;