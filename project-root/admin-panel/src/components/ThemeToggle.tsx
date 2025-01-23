import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-lg ${
          theme === 'light'
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-lg ${
          theme === 'dark'
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Moon className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-lg ${
          theme === 'system'
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Monitor className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ThemeToggle;