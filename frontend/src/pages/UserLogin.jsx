import React, { useState, useContext } from 'react';
import { Eye, EyeOff, MapPin, Users, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import LoginImage from '../utils/login.jpg';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-white md:p-10">
      {/* Top: Form */}
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-black">Kaali Peeli</h1>
            <p className="text-gray-600">Your ride, just a tap away</p>
          </div>

          <form
            onSubmit={submitHandler}
            className="p-6 space-y-4 bg-white border shadow-[0_4px_10px_rgba(234,179,8,0.5)] border-gray-200 shadow-2xl rounded-3xl"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
              <p className="text-sm text-gray-600">Sign in to book your next ride</p>
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 flex items-center text-gray-500 right-4 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div className="px-4 py-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-xl animate-[shake_0.5s_ease-in-out]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-full px-6 py-3 font-bold text-black transition-all duration-300 shadow-md bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-xl hover:-translate-y-1 hover:shadow-xl disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-black rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>

            <p className="text-sm text-center text-gray-600">
              New to Kaali Peeli?{' '}
              <button onClick={() => navigate('/signup')} className="font-semibold text-blue-600 hover:text-orange-700">
                Create Account
              </button>
            </p>
          </form>

          <button
            onClick={() => navigate('/captain-login')}
            className="flex items-center justify-center w-full px-6 py-4 text-white transition-all duration-300 bg-black shadow-md rounded-2xl"
          >
            <Users className="mr-2" size={20} />
            Sign in as Captain
          </button>

          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              Easy Booking
            </div>
            <div className="w-1 h-1 mt-2 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Shield size={16} />
              Safe Rides
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Image */}
      <div className="flex items-center justify-center w-full mt-10">
        <img
          src={LoginImage}
          alt="Login visual"
          className="w-full max-w-md scale-90"
        />
      </div>

      {/* Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default UserLogin;
