import React from 'react'

export const Community = () => {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Community Hub</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Latest Updates</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Community meeting scheduled for next week</li>
                <li className="text-gray-600">Volunteer training program registration open</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Upcoming Events</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Disaster preparedness workshop</li>
                <li className="text-gray-600">First aid training session</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  