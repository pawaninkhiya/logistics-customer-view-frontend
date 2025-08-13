"use client";
import React from "react";
import Button from "@/components/ui/Button";
import { Icons } from "@/assets/icons";

const AboutUsPage = () => {
    return (
        <div className="max-w-6xl w-full mx-auto sm:px-6 py-8">
            {/* Heading */}
            <div className="mb-12 text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
                    <Icons.Building className="h-8 w-8 text-orange-500" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    About Our Construction Logistics
                </h1>
                <p className="text-gray-600 text-sm 2xl:text-base mx-auto leading-relaxed max-w-3xl">
                    Delivering construction materials efficiently across Delhi NCR since 2015
                </p>
            </div>

            {/* Mission Statement */}
            <div className="mb-10 bg-orange-50 rounded-md p-6 border border-orange-100 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-200">
                        <Icons.Target className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                        <h2 className="xl:text-lg text-base md:font-semibold text-gray-900 mb-2">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 text-sm">
                            To revolutionize construction material transport with reliable, on-time deliveries using our specialized fleet of trucks, pickups, and Chota Hathis.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-md border border-gray-200 p-6 sm:p-8 shadow-sm mb-10">
                <div className="space-y-8">
                    {/* Our Story */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.History className="h-5 w-5 text-orange-500" />
                            Our Story
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <p>
                                Founded in 2015, we started with just 2 trucks serving local hardware stores. Today, we operate a fleet of 50+ vehicles specializing in construction material transport across Delhi NCR.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>2015: Launched with first two Tata 407 trucks</li>
                                <li>2018: Expanded to include Chota Hathi vehicles</li>
                                <li>2020: Introduced our digital booking platform</li>
                                <li>2023: Reached 500+ construction business clients</li>
                            </ul>
                        </div>
                    </div>

                    {/* Our Fleet */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Truck className="h-5 w-5 text-orange-500" />
                            Our Fleet
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <p>
                                We maintain a diverse fleet to handle all construction material needs:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Heavy Trucks:</strong> For bulk cement, sand, and steel (10-16 ton capacity)</li>
                                <li><strong>Pickups:</strong> For smaller material deliveries to tight construction sites</li>
                                <li><strong>Chota Hathis:</strong> For medium loads with better maneuverability</li>
                                <li><strong>E-Loaders:</strong> Eco-friendly options for urban construction sites</li>
                            </ul>
                        </div>
                    </div>

                    {/* Our Approach */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Lightbulb className="h-5 w-5 text-orange-500" />
                            Our Approach
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Construction Specialists:</strong> Drivers trained in material handling</li>
                                <li><strong>Site-Ready:</strong> Vehicles equipped for rough terrain access</li>
                                <li><strong>Weight-Optimized:</strong> Right vehicle for every load</li>
                                <li><strong>Real-Time Tracking:</strong> Know exactly when your materials will arrive</li>
                            </ul>
                        </div>
                    </div>

                    {/* Our Team */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.User className="h-5 w-5 text-orange-500" />
                            Our Team
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <p>
                                50+ professionals dedicated to your construction logistics:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Dispatch Team:</strong> Available 6AM-10PM to coordinate deliveries</li>
                                <li><strong>Drivers:</strong> Experienced in construction site protocols</li>
                                <li><strong>Customer Support:</strong> Construction logistics specialists</li>
                                <li><strong>Operations:</strong> Ensuring fleet readiness 24/7</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 rounded-md p-6 sm:p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ready to Streamline Your Construction Logistics?</h2>
                <div className="text-gray-600 text-sm mb-6">
                    <p>
                        Join 500+ construction businesses who trust us with their material transport needs.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="primary"
                        className="w-full sm:w-auto"
                        onClick={() => console.log("Get Started clicked")}
                    >
                        <Icons.Phone className="mr-2 h-4 w-4" />
                        Call Our Dispatch
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full sm:w-auto"
                        onClick={() => console.log("Learn More clicked")}
                    >
                        <Icons.BookOpen className="mr-2 h-4 w-4" />
                        View Our Services
                    </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
                    <p>
                        Head Office: Construction Logistics Hub, Sector 18, Noida, UP
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;