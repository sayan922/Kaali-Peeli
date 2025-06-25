import React from 'react';
import 'remixicon/fonts/remixicon.css';
import Auto from '../utils/auto.jpg'
import taxi from '../utils/taxi.jpg'
import bike from '../utils/bike.jpg'

const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel, selectVehicle, fare }) => {
    return (
        <div className="px-4 py-6 space-y-4 bg-yellow-400 rounded-t-3xl">
            {/* Close handle */}
            <div className="flex justify-center">
                <button
                    className="p-1"
                    onClick={() => setVehiclePanel(false)}
                >
                    <i className="text-2xl text-gray-700 ri-arrow-down-wide-line"></i>
                </button>
            </div>

            <h3 className="text-lg font-semibold text-black">Choose a Vehicle</h3>

            {/* Car Option */}
            <div
                onClick={() => {
                    setConfirmRidePanel(true);
                    selectVehicle('car');
                }}
                className="flex items-center justify-between w-full p-4 transition-all bg-white border-2 border-gray-200 cursor-pointer rounded-xl hover:border-yellow-500"
            >
                <img
                    className="h-10 scale-[1] rounded"
                    src={taxi}
                    alt="taxi"
                />
                <div className="flex-1 ml-4">
                    <h4 className="text-base font-semibold text-gray-800">
                        Kaali Peeli Taxi <span className="ml-1 text-sm text-gray-500"><i className="ri-user-3-fill"></i> 4</span>
                    </h4>
                    <p className="text-sm text-gray-600">2 mins away · Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold text-black">₹{fare.car}</h2>
            </div>

            {/* Moto Option */}
            <div
                onClick={() => {
                    setConfirmRidePanel(true);
                    selectVehicle('moto');
                }}
                className="flex items-center justify-between w-full p-4 transition-all bg-white border-2 border-gray-200 cursor-pointer rounded-xl hover:border-yellow-500"
            >
                <img
                    className="h-10 rounded"
                    src={bike}
                    alt="Moto"
                />
                <div className="flex-1 ml-4">
                    <h4 className="text-base font-semibold text-gray-800">
                        Kaali Peeli Bike <span className="ml-1 text-sm text-gray-500"><i className="ri-user-3-fill"></i> 1</span>
                    </h4>
                    <p className="text-sm text-gray-600">3 mins away · Motorcycle rides</p>
                </div>
                <h2 className="text-lg font-semibold text-black">₹{fare.moto}</h2>
            </div>

            {/* Auto Option */}
            <div
                onClick={() => {
                    setConfirmRidePanel(true);
                    selectVehicle('auto');
                }}
                className="flex items-center justify-between w-full p-4 transition-all bg-white border-2 border-gray-200 cursor-pointer rounded-xl hover:border-yellow-500"
            >
                <img
                    className="h-10 rounded"
                    src={Auto}
                    alt="Auto"
                />
                <div className="flex-1 ml-4">
                    <h4 className="text-base font-semibold text-gray-800">
                        Kaali Peeli Auto <span className="ml-1 text-sm text-gray-500"><i className="ri-user-3-fill"></i> 3</span>
                    </h4>
                    <p className="text-sm text-gray-600">3 mins away · Comfortable Auto rides</p>
                </div>
                <h2 className="text-lg font-semibold text-black">₹{fare.auto}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
