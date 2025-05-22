'use client';

export default function Footer() {
  return (
    <footer className="py-8 transition-all duration-300 ease-in-out
      border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
          © 2021-{new Date().getFullYear()} MS Discord Server. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 