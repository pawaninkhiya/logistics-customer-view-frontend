"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import profile from "@assets/profile.png";
import { useAuth } from '@/contexts/AuthProvider';
import { Icons } from '@/assets/assets';

const ProfilePage = () => {
    const { user } = useAuth();

    const menuItems = [
        { title: 'History', description: 'View your activity history', href: '/history' },
        { title: 'Customer Support', description: 'Get help with your account', href: '/customer&support' },
        { title: 'Terms & Conditions', description: 'Read our terms of service', href: '/terms' },
        { title: 'Delete My Account', description: 'Permanently remove your account', href: '/delete-account', isDestructive: true },
    ];

    return (
        <div className=" bg-gray-50 p-6 mt-4 rounded-md w-full">
            {/* Profile Header */}
            <div className="bg-white rounded-md shadow overflow-hidden mb-8 w-full">
                <div className="px-8 py-4 relative">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center">
                            <div className="relative h-24 w-24 rounded-full border-4 border-white bg-white shadow-md">
                                <Image
                                    src={profile}
                                    alt={user?.fullname || ""}
                                    fill
                                    className="rounded-full object-cover"
                                    sizes="96px"
                                    priority
                                />
                            </div>
                            <div className="ml-6">
                                <h1 className="text-lg font-bold text-gray-900">{user?.fullname}</h1>
                                <p className="text-gray-600 text-sm">{user?.email}</p>
                            </div>
                        </div>
                        <Link
                            href="/profile/edit"
                            className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-sm hover:shadow-md"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-md shadow overflow-hidden mb-8">
                <div className="px-8 py-5 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {menuItems.map((item, index) => (
                        <Link
                            href={item.href}
                            key={index}
                            className={`block px-8 py-5 hover:bg-gray-50 transition duration-150 ${item.isDestructive ? 'text-red-600' : ''}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className={`text-sm font-medium ${item.isDestructive ? 'text-red-600' : 'text-gray-900'}`}>
                                        {item.title}
                                    </h3>
                                    <p className={`text-xs mt-1 ${item.isDestructive ? 'text-red-400' : 'text-gray-500'}`}>
                                        {item.description}
                                    </p>
                                </div>
                                {
                                    !item.isDestructive&&
                                    < Icons.ArrowRight    className={`h-5 w-5 ${item.isDestructive ? 'text-red-400' : 'text-gray-400'}`}/>
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;