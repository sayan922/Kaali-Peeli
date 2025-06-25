import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CapatainContext';

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-400 rounded-2xl">
      {/* Profile Card */}
      <div className="p-4 mb-5 transition-shadow duration-300 bg-white shadow-lg rounded-2xl sm:p-6 hover:shadow-xl">
        <div className="flex flex-row items-start justify-between gap-4 sm:flex-row sm:gap-6">
          {/* Avatar + Info */}
          <div className="flex items-center flex-1 gap-4">
            <div className="flex items-center justify-center w-16 h-16 text-xl font-bold text-yellow-600 border-yellow-300 rounded-full shadow-md sm:w-20 sm:h-20 sm:text-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-3">
              RK
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800 truncate sm:text-xl">
                {captain?.fullname.firstname + ' ' + captain?.fullname.lastname}
              </h3>
              <p className="text-sm font-medium text-gray-600 truncate sm:text-base">
                Maruti Dzire{captain.vehicle?.vehicleType}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <i className="flex-shrink-0 text-lg text-yellow-600 ri-phone-line"></i>
                <span className="text-sm font-medium text-gray-700">96119 96979</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="self-start flex-shrink-0 sm:self-center">
            <div className="flex items-center px-3 py-2 border border-green-300 rounded-full shadow-sm bg-gradient-to-r from-green-50 to-green-100">
              <div className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Hours Online */}
        <div className="flex flex-col items-center p-3 text-center transition-all duration-200 bg-white border border-black shadow-md rounded-xl sm:rounded-2xl sm:p-4 hover:shadow-lg ">
          <div className="flex items-center justify-center w-8 h-8 mb-2 bg-black rounded-full shadow-sm sm:w-10 sm:h-10">
            <i className="text-base text-white sm:text-xl ri-timer-2-line"></i>
          </div>
          <h5 className="text-base font-bold text-gray-800 sm:text-lg">10.2</h5>
          <p className="text-xs font-medium text-gray-600 sm:text-sm">Hours</p>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center p-3 text-center transition-all duration-200 bg-white border border-black shadow-md rounded-xl sm:rounded-2xl sm:p-4 hover:shadow-lg ">
          <div className="flex items-center justify-center w-8 h-8 mb-2 bg-black rounded-full shadow-sm sm:w-10 sm:h-10">
            <i className="text-base text-white sm:text-xl ri-star-line"></i>
          </div>
          <h5 className="text-base font-bold text-gray-800 sm:text-lg">4</h5>
          <p className="text-xs font-medium text-gray-600 sm:text-sm">Rating</p>
        </div>

        {/* Earnings */}
        <div className="flex flex-col items-center p-3 text-center transition-all duration-200 bg-white border border-black shadow-md rounded-xl sm:rounded-2xl sm:p-4 hover:shadow-lg ">
          <div className="flex items-center justify-center w-8 h-8 mb-2 bg-black rounded-full shadow-sm sm:w-10 sm:h-10">
            <i className="text-base text-white sm:text-xl ri-money-rupee-circle-line"></i>
          </div>
          <h5 className="text-base font-bold text-gray-800 sm:text-lg">₹500</h5>
          <p className="text-xs font-medium text-gray-600 sm:text-sm">Earnings</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;