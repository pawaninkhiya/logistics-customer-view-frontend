"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Icons } from "@/assets/icons";
import CustomSelect from "@/components/ui/CustomSelect";

const CustomerSupportPage = () => {
    const [formData, setFormData] = useState({
        issue: "",
        reference: "",
        message: ""
    });

    const issueTypes = [
        { value: "", label: "Select an issue type", disabled: true },
        { value: "shipment-tracking", label: "Shipment Tracking" },
        { value: "pickup-delivery", label: "Pickup/Delivery" },
        { value: "billing-invoices", label: "Billing & Invoices" },
        { value: "account-access", label: "Account Access" },
        { value: "other", label: "Other" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="max-w-5xl w-full mx-auto  sm:px-6 py-8">
            {/* Heading */}
            <div className="mb-12 text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
                    <Icons.Headphones className="h-8 w-8 text-orange-500" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Transport Support Center
                </h1>
                <p className="text-gray-600 text-sm 2xl:text-base mx-auto leading-relaxed">
                    Get dedicated assistance for your logistics operations. Our team specializes in
                    shipment tracking, fleet management, and B2B transport solutions.
                </p>
            </div>

            {/* Priority Support Card */}
            <div className="mb-10 bg-gradient-to-r from-orange-50 to-amber-50 rounded-md p-6 border border-orange-100 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                        <Icons.AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="xl:text-lg text-base md:font-semibold text-gray-900 mb-1">
                            Priority Transport Support
                        </h2>
                        <p className="text-gray-600 text-sm">
                            For urgent shipment issues, vehicle breakdowns, or last-minute changes.
                        </p>
                    </div>
                    <Button
                        className="w-full sm:w-auto"
                        variant="primary"
                        onClick={() => console.log("Live chat initiated")}
                    >
                        <Icons.MessageSquare className="mr-2 h-4 w-4" />
                        Start Live Chat
                    </Button>
                </div>
            </div>

            {/* Support Grid */}
            <div className="grid gap-6 sm:grid-cols-2 mb-10">
                {/* Common Issues */}
                <div className="bg-white rounded-md border border-gray-200 p-6 shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-50 p-2 rounded-lg">
                            <Icons.List className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-gray-900">Common Queries</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                            <Icons.Truck className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                            <span>Real-time shipment tracking updates</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Icons.Calendar className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                            <span>Pickup/delivery rescheduling</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Icons.Briefcase className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                            <span>Corporate account management</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Icons.FileText className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                            <span>Invoice and payment queries</span>
                        </li>
                    </ul>
                </div>

                {/* Resolution Process */}
                <div className="bg-white rounded-md border border-gray-200 p-6 shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-50 p-2 rounded-lg">
                            <Icons.Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="font-medium text-gray-900">Resolution Timeline</h3>
                    </div>
                    <div className="space-y-4 text-sm text-gray-600">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="font-medium">Standard Issues</span>
                                <span className="font-semibold text-orange-600">2-4 hours</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-orange-400 h-2 rounded-full w-3/4"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="font-medium">Urgent Transport Cases</span>
                                <span className="font-semibold text-orange-600">Under 1 hour</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-orange-600 h-2 rounded-full w-1/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-md border border-gray-200 p-6 sm:p-8 shadow-sm mb-10">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Submit a Request</h2>
                    <p className="text-gray-600 text-sm">
                        Include your shipment ID for faster resolution. Our logistics team typically responds within 2 hours.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <CustomSelect
                            id="issue"
                            options={issueTypes}
                            label="Issue Type"
                            value={formData.issue}
                            setFieldValue={(value: string) => {
                                setFormData(prev => ({ ...prev, issue: value }));
                            }}
                        />

                    </div>

                    <div>
                        <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
                            Shipment/Booking ID (if applicable)
                        </label>
                        <input
                            type="text"
                            id="reference"
                            value={formData.reference}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-xs placeholder:text-xs sm:placeholder:text-sm sm:text-sm border rounded-md
                                focus:outline-none transition-all duration-200 ease-in-out
                                font-medium placeholder:font-medium border-gray-300 focus:ring-2 focus:ring-black/50 hover:border-gray-400"
                            placeholder="e.g., SHIP-12345"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Details
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-xs placeholder:text-xs sm:placeholder:text-sm sm:text-sm border rounded-md
                                focus:outline-none transition-all duration-200 ease-in-out
                                font-medium placeholder:font-medium border-gray-300 focus:ring-2 focus:ring-black/50 hover:border-gray-400"
                            placeholder="Describe your issue in detail..."
                            required
                        ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button type="submit" variant="secondary" className="w-full sm:w-auto">
                            <Icons.Send className="mr-2 h-4 w-4" />
                            Submit Request
                        </Button>
                    </div>
                </form>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-md p-6 sm:p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Our Logistics Team</h2>
                <div className="grid gap-6 sm:grid-cols-2 text-sm">
                    <div className="flex items-start gap-4">
                        <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
                            <Icons.Mail className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-1 text-sm">Email Support</h3>
                            <a href="mailto:support@logistics.com" className="text-gray-600 text-sm hover:text-orange-500 transition-colors">
                                support@logistics.com
                            </a>
                            <p className="text-gray-500 text-xs mt-1">Response time: 2-4 hours</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                            <Icons.Phone className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-1 text-sm">Phone Support</h3>
                            <a href="tel:+919876543210" className="text-gray-600 text-sm hover:text-orange-500 transition-colors">
                                +91 98765 43210
                            </a>
                            <p className="text-gray-500 text-xs mt-1">Mon-Sat, 8AM-8PM</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-start gap-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                            <Icons.MapPin className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-1 text-sm">Operations Center</h3>
                            <p className="text-gray-600 text-sm">Chawla Logistics HQ, Delhi, India</p>
                            <p className="text-gray-500 text-xs mt-1">Visit by appointment only</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSupportPage;