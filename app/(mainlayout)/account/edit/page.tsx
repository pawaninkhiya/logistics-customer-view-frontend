"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import profile from "@assets/profile.png";
import { useAuth } from '@/contexts/AuthProvider';
import { Icons } from '@/assets/assets';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useUpdateCustomerMutation } from '@/services/customers/hooks';
import toast from 'react-hot-toast';

const EditProfilePage = () => {
    const { user } = useAuth();
    const { mutateAsync, isPending } = useUpdateCustomerMutation();

    const [formData, setFormData] = useState({
        email: user?.email || '',
        fullname: user?.fullname || '',
        username: user?.username || '',
        contact_no: user?.contact_no || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?._id) {
            toast.error("User ID is missing. Please log in again.");

            return;
        }

        const originalData = {
            email: user?.email || '',
            fullname: user?.fullname || '',
            username: user?.username || '',
            contact_no: user?.contact_no || ''
        };

        const isChanged = Object.entries(formData).some(
            ([key, value]) => value !== (originalData as any)[key]
        );

        if (!isChanged) {
            toast.error("No changes detected to update.");
            return;
        }

        const formDataPayload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formDataPayload.append(key, value as string);
            }
        });

        try {
            await mutateAsync({ _id: user._id, payload: formDataPayload });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };


    return (
        <div className="bg-gray-50 md:p-6 mt-4 rounded-md w-full">
            <div className="bg-white rounded-md shadow overflow-hidden mb-8 w-full">
                <div className="px-8 py-5 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center">
                        <Link href="/profile" className="mr-4">
                            <Icons.ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
                    </div>
                </div>

                <div className="px-6 md:px-8 py-6">
                    <div className="flex items-center mb-8">
                        <div className="relative h-24 w-24 rounded-full border-4 border-white bg-white shadow-md">
                            <Image
                                src={profile}
                                alt={formData.fullname}
                                fill
                                className="rounded-full object-cover"
                                sizes="96px"
                                priority
                            />
                        </div>
                        <button className="ml-6 text-sm font-medium text-blue-600 hover:text-blue-500">
                            Change Photo
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={formData.fullname}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                            <Input
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                            <Input
                                label="Username"
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                            <Input
                                label="Phone Number"
                                id="contact_no"
                                name="contact_no"
                                type="tel"
                                value={formData.contact_no}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                maxLength={10}
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-6">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
