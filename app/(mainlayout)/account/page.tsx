"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import profile from "@assets/profile.png";
import { useAuth } from '@/contexts/AuthProvider';
import { Icons } from '@/assets/assets';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/modals/ConfirmModal';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteAccount = async () => {
        try {
            // Call your API to delete account
            // await deleteAccount();
            // logout();
            // router.push('/');
            toast.success('Account deleted successfully');
        } catch (error) {
            console.error('Failed to delete account:', error);
        } finally {
            setShowDeleteModal(false);
        }
    };
    const { user } = useAuth();
    const router = useRouter();
    const menuItems = [
        { title: 'History', description: 'View your activity history', href: '/history' },
        { title: 'Customer Support', description: 'Get help with your account', href: '/customer&support' },
        { title: 'Terms & Conditions', description: 'Read our terms of service', href: '/terms&conditions' },
        { title: 'About Us', description: 'Learn more about our company', href: '/about_us' },
        {
            title: 'Delete My Account',
            description: 'Permanently remove your account',
            href: '#',
            onClick: () => setShowDeleteModal(true),
            isDestructive: true
        },
    ];

    return (
        <div className=" bg-gray-50 p-4 md:p-6 mt-4 rounded-md w-full">
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
                title="Delete your account?"
                description="This action cannot be undone. This will permanently delete your account and remove all your data from our servers."
                confirmText="Delete Account"
                isDestructive
            />
            {/* Profile Header */}
            <div className="bg-white rounded-md shadow overflow-hidden mb-8 w-full">
                <div className="px-8 py-4 relative">
                    <div className="flex flex-col  md:flex-row md:justify-between items-start">
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
                        <Button
                            onClick={() => router.push('/account/edit')}
                            variant='secondary'
                            className='md:mt-0 mt-4 md:w-auto w-full'
                        >
                            Edit Profile
                        </Button>
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
                        item.onClick ? (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className={`block w-full text-left px-8 py-5 hover:bg-gray-50 transition duration-150 ${item.isDestructive ? 'text-red-600' : ''
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3
                                            className={`text-sm font-medium ${item.isDestructive ? 'text-red-600' : 'text-gray-900'
                                                }`}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className={`text-xs mt-1 ${item.isDestructive ? 'text-red-400' : 'text-gray-500'
                                                }`}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ) : (
                            <Link
                                key={index}
                                href={item.href}
                                className={`block px-8 py-5 hover:bg-gray-50 transition duration-150 ${item.isDestructive ? 'text-red-600' : ''
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs mt-1 text-gray-500">{item.description}</p>
                                    </div>
                                    <Icons.ArrowRight className="h-5 w-5 text-gray-400" />
                                </div>
                            </Link>
                        )
                    ))}
                </div>


            </div>
        </div>
    );
};

export default ProfilePage;