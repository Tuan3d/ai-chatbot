"use client";

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg 
            className="w-8 h-8 text-blue-400" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H7L10 20V17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M8 10H8.01" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 10H12.01" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M16 10H16.01" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-xl font-bold text-white">AI Chatbot</h1>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 