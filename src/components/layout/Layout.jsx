import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FiMenu, FiX, FiHome, FiBox, FiList, FiImage,
  FiSettings, FiFileText, FiMap, FiLogOut, FiUsers,
  FiGrid, FiLayout, FiSliders, FiMessageSquare,
  FiStar, FiPieChart, FiBookOpen, FiNavigation
} from 'react-icons/fi';
import { ENTITY_CONFIG } from '../../utils/entityConfig';

const iconMap = {
  products: FiBox,
  categories: FiList,
  collections: FiGrid,
  testimonials: FiMessageSquare,
  inspirations: FiStar,
  stats: FiPieChart,
  catalogues: FiBookOpen,
  finishTypes: FiSliders,
  tileSizes: FiLayout,
  spaces: FiLayout,
  pageHeroImages: FiImage,
  heroSlides: FiImage,
  homeApplicationAreas: FiNavigation,
  pressReleases: FiFileText,
  mediaAssets: FiImage,
  coverages: FiFileText,
  contactOfficeLocations: FiMap,
  tileCalculatorConfigs: FiSettings,
  siteConfigs: FiSettings,
  default: FiFileText
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const navItems = Object.keys(ENTITY_CONFIG).map(key => ({
    path: `/admin/${key}`,
    name: ENTITY_CONFIG[key].title,
    icon: iconMap[key] || iconMap.default
  }));

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-slate-200 shadow-sm w-64 transform transition-transform duration-300 ease-in-out z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:flex-col`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
          <span className="text-xl font-bold text-primary-600 tracking-tight">Admin<span className="text-slate-800">Panel</span></span>
          <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setSidebarOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `flex items-center px-6 py-3 mx-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'}`}
          >
            <FiHome className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </NavLink>

          <div className="px-6 py-3 mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Content Management
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `flex items-center px-6 py-2.5 mx-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'}`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-6 z-20">
          <div className="flex items-center">
            <button className="md:hidden text-slate-600 hover:text-primary-600 focus:outline-none" onClick={() => setSidebarOpen(true)}>
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/profile')}
              className="hidden md:flex items-center space-x-2 mr-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-primary-200 hover:text-primary-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                A
              </div>
              <span className="text-sm font-medium text-slate-700">Admin User</span>
            </button>
            <button onClick={handleLogout} className="flex items-center text-sm font-medium text-slate-500 hover:text-red-600 transition-colors">
              <FiLogOut className="w-4 h-4 mr-1.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
