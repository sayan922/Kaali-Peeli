import React from 'react';
import 'remixicon/fonts/remixicon.css';
import confirmride from '../utils/confirmride.jpg'

const ConfirmRide = ({
  setConfirmRidePanel,
  setVehicleFound,
  createRide,
  pickup,
  destination,
  fare,
  vehicleType,
}) => {
  return (
    <div className="px-4 py-6 space-y-6 bg-white rounded-t-3xl">
      {/* Close Button */}
      <div className="flex justify-center">
        <button
          className="p-1"
          onClick={() => setConfirmRidePanel(false)}
        >
          <i className="text-2xl text-gray-700 ri-arrow-down-wide-line"></i>
        </button>
      </div>

      <h3 className="text-lg font-semibold text-center text-black ">Confirm Your Ride</h3>

      {/* Vehicle Image */}
      <div className="flex justify-center">
        <img
          className="h-20 rounded-md scale-[170%] mb-8"
          src={confirmride}
          alt="Selected Vehicle"
        />
      </div>

      {/* Ride Details */}
      <div className="space-y-4">
        {/* Pickup */}
        <div className="flex items-start gap-4 p-4 bg-white border border-gray-300 rounded-xl">
          <i className="text-xl text-green-600 ri-map-pin-user-fill"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Pickup Location</h4>
            <p className="text-sm text-gray-600">{pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-4 p-4 bg-white border border-gray-300 rounded-xl">
          <i className="text-xl text-red-500 ri-map-pin-2-fill"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Destination</h4>
            <p className="text-sm text-gray-600">{destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-4 p-4 bg-white border border-gray-300 rounded-xl">
          <i className="text-xl text-yellow-600 ri-currency-line"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Fare</h4>
            <p className="text-sm text-gray-600">₹{fare?.[vehicleType] || 0} • Pay by cash</p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          setVehicleFound(true);
          setConfirmRidePanel(false);
          createRide();
        }}
        className="w-full px-6 py-3 mt-2 font-semibold text-white transition bg-black rounded-xl hover:bg-gray-900"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRide;
