import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, AlertTriangle, Shield, Loader } from 'lucide-react';

const MapView = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLoadingMarkers, setIsLoadingMarkers] = useState(false);
  const apiKey = 'AIzaSyCPcMPsIjKrQoi8nP1KJ-8PAp-aavTKB4U';
  
  const hotspots = [
    { address: 'New Delhi, India', name: 'Delhi', severity: 'High' },
    { address: 'Jaipur, Rajasthan, India', name: 'Jaipur', severity: 'Moderate' },
    { address: 'Mumbai, Maharashtra, India', name: 'Mumbai', severity: 'Low' },
    { address: 'Kolkata, West Bengal, India', name: 'Kolkata', severity: 'High' },
    { address: 'Chennai, Tamil Nadu, India', name: 'Chennai', severity: 'Moderate' },
    { address: 'Valavoor - Chakkampuzha Rd, Valavoor, Nechipuzhoor, Kerala,India', name: 'Kottayam', severity: 'High' },
  ];

  const getCoordinates = async (address) => {
    console.log('Fetching coordinates for:', address); // Debug log
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        console.log('Coordinates found:', location); // Debug log
        return { lat: location.lat, lng: location.lng };
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${address}:`, error);
    }
    return null;
  };

  const addMarkers = async (map) => {
    console.log('Starting to add markers'); // Debug log
    setIsLoadingMarkers(true);
    try {
      for (const hotspot of hotspots) {
        const coordinates = await getCoordinates(hotspot.address);
        if (coordinates) {
          const color =
            hotspot.severity === 'High' ? '#ef4444' :
            hotspot.severity === 'Moderate' ? '#f97316' : '#22c55e';
            
          // Create marker with custom popup
          const marker = L.circle([coordinates.lat, coordinates.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.6,
            radius: 50000,
            weight: 2,
          });

          // Add popup with custom styling
          const popupContent = `
            <div style="font-family: system-ui, sans-serif; padding: 8px;">
              <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${hotspot.name}</div>
              <div style="color: ${color}; font-weight: 500;">
                ${hotspot.severity} Risk Zone
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);
          marker.addTo(map);
          console.log('Added marker for:', hotspot.name); // Debug log
        }
      }
    } catch (error) {
      console.error('Error adding markers:', error);
    } finally {
      setIsLoadingMarkers(false);
    }
  };

  // Initialize map after component mounts
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      try {
        console.log('Initializing map'); // Debug log
        mapInstanceRef.current = L.map(mapRef.current).setView([28.6139, 77.2090], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapInstanceRef.current);

        setIsMapReady(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Add markers after map is initialized
  useEffect(() => {
    if (isMapReady && mapInstanceRef.current) {
      addMarkers(mapInstanceRef.current);
    }
  }, [isMapReady]);

  const getTotalsByZoneType = () => {
    const counts = {
      High: hotspots.filter(h => h.severity === 'High').length,
      Moderate: hotspots.filter(h => h.severity === 'Moderate').length,
      Low: hotspots.filter(h => h.severity === 'Low').length
    };
    return counts;
  };

  const zoneCounts = getTotalsByZoneType();

  return (
    <div className="min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Disaster Hotspots Map</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {isLoadingMarkers ? (
              <div className="flex items-center space-x-2">
                <Loader className="w-4 h-4 animate-spin" />
                <span>Loading markers...</span>
              </div>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                <span>Live Updates</span>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden shadow-inner relative">
              <div 
                ref={mapRef} 
                className="h-full w-full rounded-lg"
                style={{ minHeight: '500px' }}
              />
              {!isMapReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75">
                  <Loader className="w-8 h-8 animate-spin text-gray-500" />
                </div>
              )}
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 rounded-xl p-4 border border-red-100 transition-transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-red-900">High Risk Zones</h3>
                    <p className="text-red-700 text-2xl font-bold mt-1">{zoneCounts.High}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 transition-transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-orange-900">Moderate Risk Zones</h3>
                    <p className="text-orange-700 text-2xl font-bold mt-1">{zoneCounts.Moderate}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 border border-green-100 transition-transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-900">Low Risk Zones</h3>
                    <p className="text-green-700 text-2xl font-bold mt-1">{zoneCounts.Low}</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;