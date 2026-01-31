import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onTitleClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onTitleClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <button onClick={onTitleClick} className="text-xl font-bold text-slate-800 ml-4 text-left">
              Kalkulator Seller TikTok
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;