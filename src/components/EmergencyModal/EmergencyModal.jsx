import React, { useState } from "react";
import {
  X,
  Ambulance,
  Hospital,
  CheckCircle,
  AlertTriangle,
  Upload,
  MapPin,
} from "lucide-react";

// Mock Data
const MOCK_RESCUE_TEAMS = [
  {
    id: 1,
    name: "City Emergency Response Unit",
    contactNumber: "+1 (555) 123-4567",
    distance: "2.3 km",
    eta: "15 mins",
    type: "Fire & Rescue",
  },
  {
    id: 2,
    name: "Red Cross Emergency Team",
    contactNumber: "+1 (555) 987-6543",
    distance: "3.5 km",
    eta: "20 mins",
    type: "Medical Response",
  },
];

const MOCK_SHELTERS = [
  {
    id: 1,
    name: "City Community Shelter",
    address: "123 Emergency Road",
    capacity: "150 people",
    distance: "2.5 km",
    facilities: ["Food", "Beds", "Medical Aid"],
  },
  {
    id: 2,
    name: "Red Cross Relief Center",
    address: "456 Safety Street",
    capacity: "100 people",
    distance: "3.8 km",
    facilities: ["Medical Care", "Temporary Housing"],
  },
];

// Confirmation Modal Component
const EmergencyConfirmationModal = ({
  isOpen,
  onClose,
  rescueTeam,
  shelters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg md:max-w-xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-300"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="text-green-600" size={32} />
          <h2 className="text-2xl font-semibold text-gray-800">
            Emergency Reported
          </h2>
        </div>

        {/* Rescue Team Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-red-700 flex items-center mb-3">
            <Ambulance className="mr-2 text-red-600" size={24} />
            Nearest Rescue Team
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Team Name:</strong> {rescueTeam.name}
            </p>
            <p>
              <strong>Type:</strong> {rescueTeam.type}
            </p>
            <p>
              <strong>Contact:</strong> {rescueTeam.contactNumber}
            </p>
            <p>
              <strong>Distance:</strong> {rescueTeam.distance}
            </p>
            <p>
              <strong>Estimated Arrival:</strong> {rescueTeam.eta}
            </p>
          </div>
        </div>

        {/* Shelter Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-blue-700 flex items-center mb-3">
            <Hospital className="mr-2 text-blue-600" size={24} />
            Nearby Shelters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shelters.map((shelter) => (
              <div
                key={shelter.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <p className="text-base font-medium text-gray-800">
                  {shelter.name}
                </p>
                <p className="text-sm text-gray-600">{shelter.address}</p>
                <p className="text-sm text-gray-700">
                  <strong>Capacity:</strong> {shelter.capacity}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Distance:</strong> {shelter.distance}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Facilities:</strong> {shelter.facilities.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Emergency Modal Component
const EmergencyModal = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [locationError, setLocationError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const urls = files.map((file) => URL.createObjectURL(file));
    setImageURLs((prevURLs) => [...prevURLs, ...urls]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageURLs((prevURLs) => {
      URL.revokeObjectURL(prevURLs[index]);
      return prevURLs.filter((_, i) => i !== index);
    });
  };

  const handleGetLocation = () => {
    setLocationError(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocationError(true);
        }
      );
    } else {
      setLocationError(true);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = () => {
    if (!location) {
      alert("Please capture your location before reporting an emergency.");
      return;
    }

    const emergencyDetails = {
      description: description || "No additional details provided",
      location,
      images,
      timestamp: new Date().toISOString(),
    };

    console.log(emergencyDetails);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
      {!showConfirmation ? (
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animate-fadeIn">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="text-red-600" size={28} />
            <h2 className="text-2xl font-bold text-red-600">Report Emergency</h2>
          </div>

          <div className="space-y-6">
            {/* Optional Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide any additional information about the emergency (optional)"
                className="w-full h-32 px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none text-sm sm:text-base"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Images (Optional)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer group"
              >
                <Upload className="text-gray-400 group-hover:text-blue-500 mr-2" size={20} />
                <span className="text-gray-600 group-hover:text-blue-500">
                  Choose files
                </span>
              </label>

              {imageURLs.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {imageURLs.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Capture */}
            <div>
              <button
                onClick={handleGetLocation}
                className={`flex items-center justify-center w-full px-4 py-3 ${
                  location
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white font-medium rounded-lg transition-colors`}
              >
                <MapPin className="mr-2" size={20} />
                {location ? "Location Captured" : "Share Location (Required)"}
              </button>

              {locationError && (
                <p className="mt-2 text-sm text-red-500">
                  Unable to capture location. Please try again.
                </p>
              )}
              {location && (
                <p className="mt-2 text-sm text-gray-500">
                  Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
                  {location.longitude.toFixed(6)}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={!location}
                className={`flex-1 px-4 py-3 text-white font-medium rounded-lg transition-colors ${
                  location
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Report Emergency
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EmergencyConfirmationModal
          isOpen={showConfirmation}
          onClose={handleCloseConfirmation}
          rescueTeam={MOCK_RESCUE_TEAMS[0]}
          shelters={MOCK_SHELTERS}
        />
      )}
    </div>
  );
};

export default EmergencyModal;
