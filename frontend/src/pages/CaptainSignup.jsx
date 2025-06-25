import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CapatainContext';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import CaptainImg from '../utils/captainsignup.jpg';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (err) {
      setError('Signup failed. Try again.');
    } finally {
      setIsLoading(false);
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-white md:p-10">
      {/* Top: Form */}
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-black">Captain Registration</h1>
            <p className="text-gray-600">Join Kaali Peeli and start driving today!</p>
          </div>

          <form
            onSubmit={submitHandler}
            className="p-6 space-y-4 bg-white border shadow-[0_4px_10px_rgba(234,179,8,0.5)] border-gray-200 shadow-2xl rounded-3xl"
          >
            <div className="flex gap-4">
              <input
                type="text"
                required
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-4 py-2 bg-gray-100 border rounded-xl focus:outline-yellow-400"
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-4 py-2 bg-gray-100 border rounded-xl focus:outline-yellow-400"
              />
            </div>

            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 border rounded-xl focus:outline-yellow-400"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 border rounded-xl focus:outline-yellow-400"
            />

            <div className="flex gap-4">
              <input
                type="text"
                required
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="w-1/2 px-4 py-2 bg-gray-100 border rounded-xl focus:outline-yellow-400"
              />
              <input
                type="text"
                required
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="w-1/2 px-4 py-2 bg-gray-100 border rounded-xl focus:outline-yellow-400"
              />
            </div>

            <div className="flex gap-4">
              <input
                type="number"
                required
                placeholder="Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className="w-1/2 px-4 py-2 bg-gray-100 border rounded-xl focus:outline-yellow-400"
              />
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-1/2 px-4 py-2 text-gray-600 bg-gray-100 border rounded-xl focus:outline-yellow-400"
              >
                <option value="" disabled>Select Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-xl animate-[shake_0.5s_ease-in-out]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-full px-6 py-3 font-bold text-black transition-all duration-300 shadow-md bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-xl hover:-translate-y-1 hover:shadow-xl disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 rounded-full border-black/30 border-t-black animate-spin"></div>
              ) : (
                <>
                  Create Captain Account <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/captain-login" className="font-semibold text-blue-600 hover:text-orange-700">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Bottom: Image */}
      <div className="flex items-center justify-center w-full mt-10">
        <img
          src={CaptainImg}
          alt="Captain Illustration"
          className="w-full max-w-md scale-90"
        />
      </div>

      {/* Shake Animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default CaptainSignup;
