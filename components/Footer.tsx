
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nica-dark-blue text-nica-white mt-auto">
      <div className="container mx-auto py-6 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} NicaCultura. Un proyecto para la preservación de nuestra herencia.</p>
        <p className="text-sm text-nica-white/70 mt-1">Hecho con ❤️ para Nicaragua.</p>
      </div>
    </footer>
  );
};
