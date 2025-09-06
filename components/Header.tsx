
import React from 'react';
import { View } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { MapIcon } from './icons/MapIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { QuizIcon } from './icons/QuizIcon';
import { LibraryIcon } from './icons/LibraryIcon';

interface HeaderProps {
  setActiveView: (view: View) => void;
  activeView: View;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-nica-gold text-nica-dark-blue shadow-md'
        : 'text-nica-white hover:bg-nica-blue/50'
    }`}
  >
    {icon}
    <span className="text-xs sm:text-sm font-medium">{label}</span>
  </button>
);

export const Header: React.FC<HeaderProps> = ({ setActiveView, activeView }) => {
  const navItems = [
    { view: View.Home, label: 'Inicio', icon: <HomeIcon className="w-5 h-5 mb-1 sm:mb-0" /> },
    { view: View.Stories, label: 'Relatos', icon: <BookOpenIcon className="w-5 h-5 mb-1 sm:mb-0" /> },
    { view: View.Map, label: 'Mapa', icon: <MapIcon className="w-5 h-5 mb-1 sm:mb-0" /> },
    { view: View.Calendar, label: 'Fiestas', icon: <CalendarIcon className="w-5 h-5 mb-1 sm:mb-0" /> },
    { view: View.Quiz, label: 'Reto', icon: <QuizIcon className="w-5 h-5 mb-1 sm:mb-0" /> },
    { view: View.Library, label: 'Aportar', icon: <LibraryIcon className="w-5 h-5 mb-1 sm:mb-0" /> },
  ];

  return (
    <header className="bg-nica-blue shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <img src="https://picsum.photos/seed/nicaragua/40/40" alt="Volcano Icon" className="w-10 h-10 rounded-full border-2 border-nica-white" />
            <h1 className="text-2xl font-bold text-nica-white font-serif">NicaCultura</h1>
          </div>
          <nav className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-2">
            {navItems.map(item => (
              <NavItem
                key={item.view}
                label={item.label}
                icon={item.icon}
                isActive={activeView === item.view}
                onClick={() => setActiveView(item.view)}
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
