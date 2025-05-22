'use client';

import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg transition-all duration-300 ease-in-out
        bg-gray-100 hover:bg-gray-200 
        dark:bg-gray-800 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FaSun className="w-5 h-5 text-white transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <FaMoon className="w-5 h-5 text-black dark:text-white transition-transform duration-300 rotate-0 hover:-rotate-90" />
      )}
    </button>
  );
} 