import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { UserDataContext } from '../context/UserContext';
import UserSignupImage from '../utils/usersignup.jpg'; // Ensure this path is correct

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
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
            className="space-y-4 p-6 bg-white border shadow-[0_4px_10px_rgba(234,179,8,0.5)] border-gray-200 shadow-2xl rounded-3xl"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">Create your account</h2>
              <p className="text-sm text-gray-600">Sign up to start your journey</p>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                required
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-4 py-2 bg-[#eeeeee] border rounded-lg text-lg placeholder:text-base"
              />
              <input
                type="text"
                required
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-4 py-2 bg-[#eeeeee] border rounded-lg text-lg placeholder:text-base"
              />
            </div>

            <input
              type="email"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#eeeeee] border rounded-lg text-lg placeholder:text-base"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="6 Character Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-12 bg-[#eeeeee] border rounded-lg text-lg placeholder:text-base"
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
              <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-xl animate-[shake_0.5s_ease-in-out]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-full px-4 py-3 font-bold text-black transition-all duration-300 shadow-md bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-xl hover:-translate-y-1 hover:shadow-xl disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-orange-700">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Bottom: Image */}
      <div className="flex items-center justify-center w-full mt-10">
        <img
          src={UserSignupImage}
          alt="User Signup Visual"
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

export default UserSignup;
