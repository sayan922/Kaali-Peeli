import React from 'react';
import 'remixicon/fonts/remixicon.css';
import looking from '../utils/looking.jpg'

const LookingForDriver = ({ setVehicleFound, pickup, destination, fare, vehicleType }) => {
    return (
        <div className="w-full px-4 py-6 space-y-6 bg-white rounded-t-3xl">
            {/* Close Handle */}
            <div className="flex justify-center">
                <button
                    className="p-1"
                    onClick={() => setVehicleFound(false)}
                >
                    <i className="text-2xl text-gray-700 ri-arrow-down-wide-line"></i>
                </button>
            </div>

            <h3 className="text-lg font-semibold text-center text-black ">Looking for a Driver...</h3>

            {/* Ride Info */}
            <div className="flex flex-col items-center gap-4">
                <img
                    className="h-20 scale-[180%] mt-4 mb-7"
                    src={looking}
                    alt="Vehicle"
                />

                <div className="w-full overflow-hidden bg-white border rounded-xl">
                    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                        <i className="text-xl text-green-600 ri-map-pin-user-fill"></i>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">Pickup</h4>
                            <p className="text-sm text-gray-600">{pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                        <i className="text-xl text-red-500 ri-map-pin-2-fill"></i>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">Destination</h4>
                            <p className="text-sm text-gray-600">{destination}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4">
                        <i className="text-xl text-gray-700 ri-currency-line"></i>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">Fare</h4>
                            <p className="text-sm text-gray-600">₹{fare?.[vehicleType]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LookingForDriver;
