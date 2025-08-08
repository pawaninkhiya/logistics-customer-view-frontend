"use client"
import { Icons } from '@/assets/assets'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthProvider'

const Navbar = () => {
    const { logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="w-full bg-white  pb-10">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    {/* Left: Delivery Details */}
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-50 rounded-full">
                            <Icons.Lock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-gray-800 font-semibold">Delivery Details</p>
                            <p className="text-gray-500 text-sm hidden sm:block">
                                Enter pickup, delivery locations and shipment details
                            </p>
                        </div>
                    </div>

                    {/* Right: Desktop Navigation Links */}
                    <div className="hidden md:flex gap-6 items-center text-sm xl:text-base font-medium text-gray-700">
                        <Link href="/" className="hover:text-orange-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/booking" className="hover:text-orange-600 transition-colors">
                            Booking
                        </Link>
                        <Link href="/account" className="hover:text-orange-600 transition-colors">
                            Account
                        </Link>
                        <Link href="/payment" className="hover:text-orange-600 transition-colors">
                            Payment
                        </Link>
                        <div className="flex gap-2 items-center">
                            <div className='h-8 border-l-2'></div>
                            <button onClick={() => logout()} className="transition-colors cursor-pointer bg-black rounded p-2 text-white ">
                                <Icons.Logout />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Icons.Clock className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-2 space-y-2 border-t border-gray-200 pt-3">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/booking"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Booking
                        </Link>
                        <Link
                            href="/account"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Account
                        </Link>
                        <Link
                            href="/payment"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Payment
                        </Link>
                        <button
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600"
                            onClick={() => {
                                // Handle logout logic here
                                setMobileMenuOpen(false)
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar