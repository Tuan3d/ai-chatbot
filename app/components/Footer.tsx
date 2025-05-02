import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-3 text-gray-400 border-t border-gray-800 mt-auto">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Anh Tuan - Studio
        </p>
      </div>
    </footer>
  );
};

export default Footer; 