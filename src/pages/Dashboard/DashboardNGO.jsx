import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
    Bell, Users, Box, Activity, AlertTriangle,
    Search, Plus, X, Map, LogOut, Menu
} from 'lucide-react';
import Overview from '../../components/Overview/Overview';
import { Alerts } from '../../components/Alerts/Alerts';
import { Resources } from '../../components/Resources/Resources';
import { Volunteers } from '../../components/Volunteers/Volunteers';
import { Community } from '../../components/Community/Community';
import MapView from '../../components/MapView/MapView';
import logo from "../../assets/logo4.png";
import { useNavigate } from 'react-router-dom';

const mockData = {
    alerts: [
        { id: 1, type: 'Flood Warning', location: 'Chennai', severity: 'High', timestamp: '2024-01-21T10:30:00' },
        { id: 2, type: 'Cyclone Alert', location: 'Mumbai', severity: 'Medium', timestamp: '2024-01-21T09:15:00' }
    ],
    resourceStats: [
        { month: 'Jan', supplies: 4000, volunteers: 2400 },
        { month: 'Feb', supplies: 3000, volunteers: 1398 },
        { month: 'Mar', supplies: 2000, volunteers: 9800 },
        { month: 'Apr', supplies: 2780, volunteers: 3908 }
    ]
};

const DashboardNGO = () => {
    const [chartType, setChartType] = useState('line');
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAddResource, setShowAddResource] = useState(false);
    const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const navigate = useNavigate();

    // Responsive check
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderChart = () => {
        const ChartComponent = chartType === 'line' ? LineChart : BarChart;
        const DataComponent = chartType === 'line' ? Line : Bar;

        return (
            <div className="w-full overflow-x-auto">
                <ChartComponent 
                    width={isMobile ? 350 : 500} 
                    height={300} 
                    data={mockData.resourceStats}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <DataComponent type="monotone" dataKey="supplies" fill="#6366f1" stroke="#6366f1" />
                    <DataComponent type="monotone" dataKey="volunteers" fill="#22c55e" stroke="#22c55e" />
                </ChartComponent>
            </div>
        );
    };

    const NotificationPanel = () => (
        <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white rounded-xl shadow-lg p-4 z-50 border border-indigo-100">
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

    const AddResourceModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-4 sm:p-6 w-11/12 sm:w-96 max-w-md shadow-2xl" role="dialog" aria-modal="true">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-indigo-900">Add New Resource</h3>
                    <button
                        onClick={() => setShowAddResource(false)}
                        className="text-indigo-500 hover:text-indigo-700 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="resourceName" className="block text-sm font-medium text-indigo-900">
                            Resource Name
                        </label>
                        <input
                            id="resourceName"
                            type="text"
                            className="mt-1 block w-full rounded-lg border-indigo-200 shadow-sm p-2 border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-indigo-900">
                            Quantity
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            min="0"
                            className="mt-1 block w-full rounded-lg border-indigo-200 shadow-sm p-2 border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-indigo-900">
                            Location
                        </label>
                        <select
                            id="location"
                            className="mt-1 block w-full rounded-lg border-indigo-200 shadow-sm p-2 border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        >
                            <option value="">Select location</option>
                            <option value="warehouse-a">Warehouse A</option>
                            <option value="warehouse-b">Warehouse B</option>
                            <option value="warehouse-c">Warehouse C</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowAddResource(false)}
                            className="px-4 py-2 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Add Resource
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderContent = () => {
        const tabs = {
            overview: <Overview mockData={mockData} chartType={chartType} renderChart={renderChart} />,
            alerts: <Alerts />,
            map: <MapView />,
            resources: <Resources />,
            volunteers: <Volunteers />,
            community: <Community />
        };

        return (
            <>
                {activeTab === 'overview' && (
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                            {['24h', '7d', '30d', '1y'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setSelectedTimeRange(range)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                        selectedTimeRange === range
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-white text-indigo-600 hover:bg-indigo-50'
                                    }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowAddResource(true)}
                            className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Resource</span>
                        </button>
                    </div>
                )}
                {tabs[activeTab]}
            </>
        );
    };

    const sidebarItems = [
        { id: 'overview', icon: Activity, label: 'Overview' },
        { id: 'map', icon: Map, label: 'Map View' },
        { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
        { id: 'resources', icon: Box, label: 'Resources' },
        { id: 'volunteers', icon: Users, label: 'Volunteers' },
        { id: 'community', icon: Users, label: 'Community' }
    ];

    // Mobile Menu
    const MobileMenu = () => (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b">
                <div
                    className="h-12 w-12 relative hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={() => {
                        navigate('/');
                        setIsMobileMenuOpen(false);
                    }}
                >
                    <img
                        src={logo}
                        alt="ResQ Logo"
                        className="object-contain h-full w-full"
                    />
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-indigo-600"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>
            <nav className="space-y-2 p-4">
                {sidebarItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            setIsMobileMenuOpen(false);
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
                        onClick={() => {
                            navigate('/');
                            setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </nav>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
            {/* Responsive Navbar */}
            <nav className="bg-white shadow-md px-4 sm:px-6 py-2 border-b-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {isMobile && (
                            <button 
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="mr-4 text-indigo-600"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                        <div
                            className="h-12 sm:h-16 w-12 sm:w-16 relative hover:scale-110 transition-transform duration-300 cursor-pointer"
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
                        {!isMobile && (
                            <form onSubmit={(e) => e.preventDefault()} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="rounded-full py-2 px-6 w-48 sm:w-64 text-sm text-indigo-900 placeholder-indigo-400 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <Search className="w-5 h-5 text-indigo-500 hover:text-indigo-700 transition-colors duration-200" />
                                </button>
                            </form>
                        )}

                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="text-indigo-600 relative focus:outline-none hover:scale-105 transition-transform duration-200"
                                aria-label="Toggle notifications"
                            >
                                <Bell className="w-5 sm:w-6 h-5 sm:h-6" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 text-xs flex items-center justify-center font-semibold shadow-md">
                                    {mockData.alerts.length}
                                </span>
                            </button>
                            {showNotifications && <NotificationPanel />}
                        </div>

                        {!isMobile && (
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center hover:shadow-lg transition-shadow duration-200 overflow-hidden ring-2 ring-indigo-200">
                                <img
                                    src="https://picsum.photos/40"
                                    alt="User Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="flex flex-col sm:flex-row">
                {/* Desktop Sidebar */}
                {!isMobile && (
                    <aside className="hidden sm:block w-64 bg-white h-screen p-4 shadow-lg">
                        <nav className="space-y-2">
                            {sidebarItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
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
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-8">
                    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                        {renderContent()}
                    </div>
                </main>
            </div>

            {showAddResource && <AddResourceModal />}
            {isMobileMenuOpen && <MobileMenu />}
        </div>
    );
};

export default DashboardNGO;