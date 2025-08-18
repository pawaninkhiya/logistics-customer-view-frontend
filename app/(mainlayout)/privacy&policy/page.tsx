"use client";
import React, { useRef } from "react";
import Button from "@/components/ui/Button";
import { Icons } from "@/assets/icons";

const PrivacyPolicyPage = () => {
    const topRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="max-w-6xl w-full mx-auto sm:px-6 py-8" ref={topRef}>
            {/* Heading */}
            <div className="mb-12 text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
                    <Icons.Shield className="h-8 w-8 text-orange-500" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Construction Logistics Privacy Policy
                </h1>
                <p className="text-gray-600 text-sm 2xl:text-base mx-auto leading-relaxed max-w-3xl">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Introduction */}
            <div className="mb-10 bg-orange-50 rounded-md p-6 border border-orange-100 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-200">
                        <Icons.Info className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                        <h2 className="xl:text-lg text-base md:font-semibold text-gray-900 mb-2">
                            Your Privacy Matters
                        </h2>
                        <p className="text-gray-600 text-sm">
                            This policy explains how we collect, use, and protect your information when you use our construction logistics services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Policy Content */}
            <div className="bg-white rounded-md border border-gray-200 p-6 sm:p-8 shadow-sm mb-10">
                <div className="space-y-8">
                    {/* Section 1 */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.UserCheck className="h-5 w-5 text-orange-500" />
                            1. Information We Collect
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 sm:pl-7">
                            <p>
                                To provide our construction transport services, we collect:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Business contact details (name, company, phone, email)</li>
                                <li>Construction site addresses and delivery details</li>
                                <li>Material specifications and transport requirements</li>
                                <li>Payment and billing information</li>
                                <li>Vehicle location data during active deliveries</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Database className="h-5 w-5 text-orange-500" />
                            2. How We Use Your Information
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 sm:pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To coordinate and fulfill construction material deliveries</li>
                                <li>To communicate about your transport bookings</li>
                                <li>To improve our services and fleet operations</li>
                                <li>To process payments and maintain financial records</li>
                                <li>To comply with transport regulations and requirements</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Share2 className="h-5 w-5 text-orange-500" />
                            3. Information Sharing
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 sm:pl-7">
                            <p>
                                We only share your information when necessary:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>With drivers and dispatch teams to complete deliveries</li>
                                <li>With payment processors for transaction processing</li>
                                <li>With government authorities as required by transport laws</li>
                                <li>With subcontractors when additional transport capacity is needed</li>
                            </ul>
                            <p className="pt-2">
                                We never sell your data to third-party marketers.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Lock className="h-5 w-5 text-orange-500" />
                            4. Data Security
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 sm:pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Encrypted storage for sensitive business information</li>
                                <li>Limited access to customer data within our organization</li>
                                <li>Secure payment processing with PCI-compliant partners</li>
                                <li>Regular security audits of our systems</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Clock className="h-5 w-5 text-orange-500" />
                            5. Data Retention
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 sm:pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Active customer records: Retained for 5 years after last booking</li>
                                <li>Financial transactions: Retained for 7 years for tax purposes</li>
                                <li>Delivery records: Retained for 3 years for liability purposes</li>
                                <li>Inactive accounts: Anonymized after 5 years of inactivity</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.UserX className="h-5 w-5 text-orange-500" />
                            6. Your Rights
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 sm:pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Access the personal data we hold about your business</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of non-essential data (subject to legal requirements)</li>
                                <li>Opt-out of non-essential communications</li>
                                <li>Withdraw consent for data processing where applicable</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-md p-6 sm:p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <div className="text-gray-600 text-sm mb-6">
                    <p>
                        For privacy-related inquiries or to exercise your rights:
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                        variant="primary"
                        className="w-full sm:w-auto"
                        onClick={scrollToTop}
                    >
                        <Icons.ArrowUp className="mr-2 h-4 w-4" />
                        Back to Top
                    </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
                    <p>
                        Data Protection Officer: dpo@constructionlogistics.com or +91 98765 43210
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;