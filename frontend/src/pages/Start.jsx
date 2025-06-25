import React from 'react';
import { Link } from 'react-router-dom';
import StartImage from '../utils/start.jpg';

const Start = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-white">
      {/* Branding */}
      <div className="text-center">
        <h1 className="text-5xl italic font-bold text-black drop-shadow-md">
          Kaali Peeli
        </h1>
        <p className="mt-2 text-base font-medium text-black/70">
          Your ride, just a tap away
        </p>
      </div>

      {/* Centered Illustration */}
      <img
        src={StartImage}
        alt="Start Visual"
        className="object-contain w-full max-w-xs mt-10 md:max-w-md"
      />

      {/* Continue Button */}
      <div className="w-full max-w-xs mt-10">
        <Link
          to="/login"
          className="block w-full py-3 font-semibold text-center text-black transition bg-yellow-400 rounded-xl hover:bg-yellow-300"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
