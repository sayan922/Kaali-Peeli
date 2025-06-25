import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'
import CaptainImg from '../utils/captainhome.jpg'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
    // return () => clearInterval(locationInterval)
  }, [])

  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopupPanel(true)
  })

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  useGSAP(
    () => {
      gsap.to(ridePopupPanelRef.current, {
        transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      })
    },
    [ridePopupPanel]
  )

  useGSAP(
    () => {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      })
    },
    [confirmRidePopupPanel]
  )

  return (
    <div className="relative h-screen overflow-hidden ">
      {/* Header */}
       <div className="absolute top-0 left-0 right-0 z-20 border-b border-gray-200 backdrop-blur-lg bg-white/80">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kaali Peeli</h1>
                <p className="text-sm font-medium text-gray-600">Captain Dashboard</p>
              </div>
            </div>

            <Link
              to="/captain-login"
              className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-gray-100 border border-gray-300 hover:bg-gray-200 rounded-xl group"
            >
              <i className="text-lg font-medium text-gray-600 ri-logout-box-r-line"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Map or Banner Section */}
      <div className="pt-20 h-3/5">
        <img
          className="object-contain w-full h-full"
          src={CaptainImg}
          alt="Captain Banner"
        />
      </div>

      {/* Captain Details */}
      <div className="bg-white h-2/5 rounded-t-3xl">
        <CaptainDetails />
      </div>

      {/* Ride Request Panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed bottom-0 z-30 w-full translate-y-full bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 py-8 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed bottom-0 z-30 w-full h-screen translate-y-full bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 py-8 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
