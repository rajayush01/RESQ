import React, { useState } from 'react';
import {
    Bell, Users, Activity, AlertTriangle, X, Map, LogOut, Calendar, HelpCircle, Menu
} from 'lucide-react';
import { Alerts } from '../../components/Alerts/Alerts';
import { Volunteers } from '../../components/Volunteers/Volunteers';
import MapView from '../../components/MapView/MapView';
import logo from "../../assets/logo4.png";
import { useNavigate } from 'react-router-dom';
import { Community } from '../../components/Community/Community';

const mockData = {
    alerts: [
        { id: 1, type: 'Flood Warning', location: 'Chennai', severity: 'High', timestamp: '2024-01-21T10:30:00' },
        { id: 2, type: 'Cyclone Alert', location: 'Mumbai', severity: 'Medium', timestamp: '2024-01-21T09:15:00' }
    ],
    contributions: [
        { id: 1, type: 'Flood Relief Distribution', location: 'Kolkata', status: 'Completed', date: '2024-01-15' },
        { id: 2, type: 'Earthquake Awareness Drive', location: 'Delhi', status: 'Upcoming', date: '2024-02-05' }
    ],
    impactSummary: {
        disasterEfforts: 8,
        hoursVolunteered: 60,
        communitiesImpacted: 25,
        activeAlerts: 3,
        activeVolunteers: 42,
        helpRequests: 5
    },
    upcomingOpportunities: [
        { id: 1, type: 'Disaster Preparedness Drill', location: 'Hyderabad', date: '2024-02-15' },
        { id: 2, type: 'Cyclone Awareness Campaign', location: 'Bangalore', date: '2024-03-05' }
    ]
};

const DashboardIndividual = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const NotificationPanel = () => (
        <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white rounded-xl shadow-2xl p-4 z-50 border border-indigo-100 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-indigo-900">Notifications</h3>
                <button
                    onClick={() => setShowNotifications(false)}
                    className="text-indigo-500 hover:text-indigo-700 transition-colors"
                    aria-label="Close notifications"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="space-y-4">
                {mockData.alerts.map(alert => (
                    <div key={alert.id} className="border-b border-indigo-100 pb-2">
                        <p className="text-sm font-medium text-indigo-900">{alert.type} - {alert.location}</p>
                        <p className="text-xs text-indigo-500">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const OverviewStats = ({ summary }) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {[
                { id: 1, label: 'Active Alerts', value: summary.activeAlerts, icon: AlertTriangle, color: 'red' },
                { id: 2, label: 'Active Volunteers', value: summary.activeVolunteers, icon: Users, color: 'green' },
                { id: 3, label: 'Help Requests', value: summary.helpRequests, icon: HelpCircle, color: 'indigo' }
            ].map(item => (
                <div 
                    key={item.id} 
                    className={`flex items-center space-x-2 sm:space-x-4 p-4 sm:p-6 border rounded-lg shadow-sm hover:shadow-xl transition-all duration-200 bg-${item.color}-50 animate-fade-in`}
                > 
                    <item.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${item.color}-600`} />
                    <div>
                        <h3 className={`text-lg sm:text-xl font-semibold text-${item.color}-900`}>{item.value}</h3>
                        <p className={`text-xs sm:text-sm text-${item.color}-500`}>{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const RecentAlerts = ({ alerts }) => (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md mb-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-4">Recent Alerts</h2>
            <div className="space-y-2 sm:space-y-4">
                {alerts.slice(0, 3).map((alert) => (
                    <div
                        key={alert.id}
                        className="flex items-center justify-between p-2 sm:p-4 border border-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-indigo-900">{alert.type}</h3>
                            <p className="text-xs sm:text-sm text-indigo-500">{alert.location}</p>
                        </div>
                        <div className="text-xs sm:text-sm text-indigo-700">
                            {new Date(alert.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const UpcomingOpportunities = ({ opportunities }) => (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-4 sm:mb-6">Upcoming Opportunities</h2>
            {opportunities.length === 0 ? (
                <p className="text-indigo-500">No upcoming opportunities available. Stay tuned!</p>
            ) : (
                <div className="space-y-2 sm:space-y-4">
                    {opportunities.map((opportunity) => (
                        <div
                            key={opportunity.id}
                            className="flex items-center justify-between p-2 sm:p-4 border border-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                        >
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-indigo-900">{opportunity.type}</h3>
                                <p className="text-xs sm:text-sm text-indigo-500">{opportunity.location}</p>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
                                <span className="text-xs sm:text-sm text-indigo-700">
                                    {new Date(opportunity.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderContent = () => {
        const tabs = {
            overview: (
                <div className="space-y-4 sm:space-y-6">
                    <OverviewStats summary={mockData.impactSummary} />
                    <RecentAlerts alerts={mockData.alerts} />
                    <UpcomingOpportunities opportunities={mockData.upcomingOpportunities} />
                </div>
            ),
            alerts: <Alerts />,
            map: <MapView />,
            volunteers: <Volunteers />,
            community: <Community />
        };

        return tabs[activeTab];
    };

    const sidebarItems = [
        { id: 'overview', icon: Activity, label: 'Overview' },
        { id: 'map', icon: Map, label: 'Map View' },
        { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
        { id: 'volunteers', icon: Users, label: 'Volunteers' },
        { id: 'community', icon: Users, label: 'Community' }
    ];

    const Sidebar = ({ isMobile }) => (
        <aside 
            className={`
                ${isMobile ? 'fixed inset-0 z-50 bg-white/90 backdrop-blur-sm' : 'w-64 bg-white h-screen'}
                ${isMobile && !isMobileSidebarOpen ? 'hidden' : 'block'}
                p-4 shadow-lg overflow-y-auto
            `}
        >
            {isMobile && (
                <button 
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800"
                >
                    <X className="w-6 h-6" />
                </button>
            )}
            <nav className="space-y-2 mt-8 sm:mt-0">
                {sidebarItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            isMobile && setIsMobileSidebarOpen(false);
                        }}
                        className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                            activeTab === item.id
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-indigo-900 hover:bg-indigo-50'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
                <div className="pt-4 mt-4 border-t border-indigo-100">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </nav>
        </aside>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
            {/* Mobile Responsive Navbar */}
            <nav className="bg-white shadow-md px-4 sm:px-6 py-2 border-b-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-0">
                        <button 
                            onClick={() => setIsMobileSidebarOpen(true)} 
                            className="sm:hidden mr-2 text-indigo-600"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div
                            className="h-12 w-12 sm:h-16 sm:w-16 relative hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            <img
                                src={logo}
                                alt="ResQ Logo"
                                className="object-contain h-full w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-6">
                        <form onSubmit={(e) => e.preventDefault()} className="hidden sm:block relative">
                            <input
                                type="text"
                                placeholder="Search opportunities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="rounded-full py-1 sm:py-2 px-3 sm:px-6 w-40 sm:w-64 text-xs sm:text-sm text-indigo-900 placeholder-indigo-400 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                            />
                        </form>

                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="text-indigo-600 relative focus:outline-none hover:scale-105 transition-transform duration-200"
                                aria-label="Toggle notifications"
                            >
                                <Bell className="w-4 sm:w-6 h-4 sm:h-6" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 text-[10px] sm:text-xs flex items-center justify-center font-semibold shadow-md">
                                    {mockData.alerts.length}
                                </span>
                            </button>
                            {showNotifications && <NotificationPanel />}
                        </div>

                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center hover:shadow-lg transition-shadow duration-200 overflow-hidden ring-2 ring-indigo-200">
                            <img
                                src="https://picsum.photos/40"
                                alt="User Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col sm:flex-row">
                {/* Desktop Sidebar */}
                <div className="hidden sm:block">
                    <Sidebar isMobile={false} />
                </div>

                {/* Mobile Sidebar */}
                <Sidebar isMobile={true} />

                <main className="flex-1 p-4 sm:p-8">
                    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardIndividual;