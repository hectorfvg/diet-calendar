import React from 'react';
import { Calendar, ShoppingCart } from 'lucide-react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navigation">
      <button
        className={`nav-tab ${activeTab === 'calendar' ? 'active' : ''}`}
        onClick={() => onTabChange('calendar')}
      >
        <Calendar size={20} />
        Calendari
      </button>
      <button
        className={`nav-tab ${activeTab === 'shopping' ? 'active' : ''}`}
        onClick={() => onTabChange('shopping')}
      >
        <ShoppingCart size={20} />
        Llista de la Compra
      </button>
    </nav>
  );
};

export default Navigation;