import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-red-300 text-gray-800">
      <h1 className="text-5xl font-bold mb-6 drop-shadow-md">🍔 Food Shop</h1>
      <p className="text-lg mb-8 text-gray-700">Discover, Explore, and Enjoy your favorite foods.</p>
      <button
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg shadow-md transition-transform transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
