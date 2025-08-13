"use client"
import { Icons } from '@/assets/assets'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthProvider'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const { logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <div className="w-full bg-white shadow border  border-gray-100  sticky md:static top-0 z-50 rounded-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Left: Delivery Details */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 rounded-full">
                            <Icons.Lock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-800 font-semibold text-sm sm:text-base">Delivery Details</p>
                            <p className="text-gray-500 text-xs sm:text-sm">
                                <span className="sm:hidden">Pickup & delivery</span>
                                <span className="hidden sm:inline">Enter pickup, delivery locations and shipment details</span>
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-6 items-center text-sm xl:text-base font-medium text-gray-700">
                        <Link
                            href="/"
                            className={`hover:text-orange-600 transition-colors ${isActive('/') ? 'text-orange-600 font-semibold' : ''}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/bookings"
                            className={`hover:text-orange-600 transition-colors ${isActive('/bookings') ? 'text-orange-600 font-semibold' : ''}`}
                        >
                            Booking
                        </Link>
                        <Link
                            href="/account"
                            className={`hover:text-orange-600 transition-colors ${isActive('/account') ? 'text-orange-600 font-semibold' : ''}`}
                        >
                            Account
                        </Link>
                        <Link
                            href="/payment"
                            className={`hover:text-orange-600 transition-colors ${isActive('/payment') ? 'text-orange-600 font-semibold' : ''}`}
                        >
                            Payment
                        </Link>
                        <div className="flex gap-2 items-center">
                            <div className='h-8 border-l-2 border-gray-300'></div>
                            <button
                                onClick={() => logout()}
                                className="transition-colors cursor-pointer bg-black rounded p-2 text-white hover:bg-gray-800"
                                aria-label="Logout"
                            >
                                <Icons.Logout className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <Icons.Close className="w-6 h-6" />
                        ) : (
                            <Icons.Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute w-full bg-white shadow-lg z-40 "
                    >
                        <div className="px-4 pt-2 pb-4 space-y-2 border-t border-gray-200">
                            {/* Current Location */}
                            {/* <div className="px-3 py-3 bg-gray-50 rounded-lg flex items-center gap-3">
                                <Icons.Location className="w-5 h-5 text-orange-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Current Location</p>
                                    <p className="text-xs text-gray-500">123 Main St, City, Country</p>
                                </div>
                            </div> */}

                            <Link
                                href="/"
                                className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${isActive('/') ? 'text-orange-600 bg-orange-50 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/bookings"
                                className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${isActive('/bookings') ? 'text-orange-600 bg-orange-50 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Booking
                            </Link>
                            <Link
                                href="/account"
                                className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${isActive('/account') ? 'text-orange-600 bg-orange-50 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Account
                            </Link>
                            <Link
                                href="/payment"
                                className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${isActive('/payment') ? 'text-orange-600 bg-orange-50 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Payment
                            </Link>
                            <button
                                className="block w-full text-left px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                                onClick={() => {
                                    logout();
                                    setMobileMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Navbar