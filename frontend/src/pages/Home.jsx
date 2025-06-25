import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import { MapPin, Navigation, ArrowDown, Search } from 'lucide-react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [user])

    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])

    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setFare(response.data)
    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
    }

    return (
        <div className='relative h-screen overflow-hidden'>
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 border-b border-gray-200 backdrop-blur-lg bg-white/80">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">

                        {/* Left: Brand Icon and Text */}
                        <div className="flex items-center space-x-4">
                            
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Kaali Peeli</h1>
                                <p className="text-sm font-medium text-gray-600">Your ride, just a tap away</p>
                            </div>
                        </div>

                        {/* Right: User Initial Button */}
                        <button
                            title="Profile"
                            className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-gray-100 border border-gray-300 hover:bg-gray-200 rounded-xl"
                        >
                            <span className="text-sm font-semibold text-gray-700">
                                {typeof user?.fullname === 'string' ? user.fullname.charAt(0).toUpperCase() : 'U'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>


            {/* Map Container */}
            <div className='w-screen h-screen pt-20'>
                <LiveTracking />
            </div>

            {/* Bottom Panel Container */}
            <div className='absolute top-0 flex flex-col justify-end w-full h-screen pointer-events-none'>
                <div className='pointer-events-auto'>
                    {/* Main Booking Panel */}
                    <div className='bg-yellow-400 border-0 border-gray-100 rounded-t-3xl'>
                        <div className='px-6 py-6'>
                            {/* Panel Header */}
                            <div className='flex items-center justify-between mb-6'>
                                <div>
                                    <h2 className='text-xl font-bold text-gray-800'>Where to?</h2>
                                    <p className='text-sm text-gray-900'>Book your next ride</p>
                                </div>
                                <button
                                    ref={panelCloseRef}
                                    onClick={() => setPanelOpen(false)}
                                    className='flex items-center justify-center w-8 h-8 transition-colors bg-gray-100 border border-black rounded-full opacity-0 hover:bg-gray-200'
                                >
                                    <ArrowDown size={16} className='text-gray-900' />
                                </button>
                            </div>

                            {/* Trip Form */}
                            <form onSubmit={submitHandler} className='space-y-4'>
                                {/* Route Line Indicator */}
                                <div className="relative">
                                    <div className="absolute border-black border left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500 via-gray-300 to-red-500 rounded-full"></div>

                                    {/* Pickup Input */}
                                    <div className="relative">
                                        <MapPin size={16} className="absolute z-10 text-green-500 transform -translate-y-1/2 bg-white left-4 top-1/2" />
                                        <input
                                            onClick={() => {
                                                setPanelOpen(true)
                                                setActiveField('pickup')
                                            }}
                                            value={pickup}
                                            onChange={handlePickupChange}
                                            className='w-full py-4 pl-12 pr-4 text-gray-800 placeholder-gray-500 transition-all border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-yellow-400 focus:outline-none focus:bg-white'
                                            type="text"
                                            placeholder='Pickup location'
                                        />
                                    </div>

                                    {/* Destination Input */}
                                    <div className="relative mt-3">
                                        <Navigation size={16} className="absolute z-10 text-red-500 transform -translate-y-1/2 bg-white left-4 top-1/2" />
                                        <input
                                            onClick={() => {
                                                setPanelOpen(true)
                                                setActiveField('destination')
                                            }}
                                            value={destination}
                                            onChange={handleDestinationChange}
                                            className='w-full py-4 pl-12 pr-4 text-gray-800 placeholder-gray-500 transition-all border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-yellow-400 focus:outline-none focus:bg-white'
                                            type="text"
                                            placeholder='Where are you going?'
                                        />
                                    </div>
                                </div>

                                {/* Find Trip Button */}
                                <button
                                    onClick={findTrip}
                                    disabled={!pickup || !destination}
                                    className='flex items-center justify-center w-full px-6 py-4 mt-6 font-semibold text-white transition-all duration-300 bg-black shadow-md rounded-xl hover:-translate-y-1 hover:shadow-xldisabled:hover:translate-y-0 disabled:hover:shadow-md'
                                >
                                    <Search size={18} className='mr-2' />
                                    Find Your Ride
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Search Suggestions Panel */}
                    <div ref={panelRef} className='h-0 overflow-hidden bg-white'>
                        <LocationSearchPanel
                            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                            setPanelOpen={setPanelOpen}
                            setVehiclePanel={setVehiclePanel}
                            setPickup={setPickup}
                            setDestination={setDestination}
                            activeField={activeField}
                        />
                    </div>
                </div>
            </div>

            {/* Vehicle Selection Panel */}
            <div ref={vehiclePanelRef} className='fixed bottom-0 z-30 w-full translate-y-full bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)]'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            {/* Confirm Ride Panel */}
            <div ref={confirmRidePanelRef} className='fixed bottom-0 z-30 w-full  translate-y-full bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)]'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            {/* Looking for Driver Panel */}
            <div ref={vehicleFoundRef} className='fixed bottom-0 z-30 w-full  translate-y-full bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)]'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            {/* Waiting for Driver Panel */}
            <div ref={waitingForDriverRef} className='fixed bottom-0 z-30 w-full  bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)]'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    )
}

export default Home