import React from 'react';
import { Home, Calculator, List, LogOut } from 'lucide-react';
import { Page } from '../App';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  currentPage: Page;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, onLogout, currentPage }) => {
  const activeLinkClasses = "bg-cyan-100 text-cyan-700";
  const inactiveLinkClasses = "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="p-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Menu</h2>
            <nav>
              <ul>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('dashboard');
                    }}
                    className={`flex items-center px-4 py-2 text-lg font-medium rounded-md ${currentPage === 'dashboard' ? activeLinkClasses : inactiveLinkClasses}`}
                  >
                    <Home className="mr-3" size={20} />
                    Dashboard
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('calculator');
                    }}
                    className={`flex items-center px-4 py-2 text-lg font-medium rounded-md ${currentPage === 'calculator' ? activeLinkClasses : inactiveLinkClasses}`}
                  >
                    <Calculator className="mr-3" size={20} />
                    Kalkulator
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('productList');
                    }}
                    className={`flex items-center px-4 py-2 text-lg font-medium rounded-md ${currentPage === 'productList' ? activeLinkClasses : inactiveLinkClasses}`}
                  >
                    <List className="mr-3" size={20} />
                    Daftar Produk
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLogout();
            }}
            className={`flex items-center px-4 py-2 text-lg font-medium rounded-md ${inactiveLinkClasses}`}
          >
            <LogOut className="mr-3" size={20} />
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;