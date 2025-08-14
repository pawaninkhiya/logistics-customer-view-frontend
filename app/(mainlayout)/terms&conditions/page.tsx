"use client";
import React, { useRef } from "react";
import Button from "@/components/ui/Button";
import { Icons } from "@/assets/icons";

const TermsAndConditionsPage = () => {
    const topRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="max-w-6xl w-full mx-auto sm:px-6 py-8"  ref={topRef}>
            {/* Heading */}
            <div className="mb-12 text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
                    <Icons.FileText className="h-8 w-8 text-orange-500" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Construction Transport Terms
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
                            Important Notice
                        </h2>
                        <p className="text-gray-600 text-sm">
                            These terms govern your use of our construction material transport services. By booking vehicles, you agree to these terms.
                        </p>
                    </div>
                </div>
            </div>

            {/* Terms Content */}
            <div className="bg-white rounded-md border border-gray-200 p-6 sm:p-8 shadow-sm mb-10">
                <div className="space-y-8">
                    {/* Section 1 */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Truck className="h-5 w-5 text-orange-500" />
                            1. Transport Services
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <p>
                                We provide local transport solutions for construction materials including trucks, pickups, Chota Hathis, and e-loaders within 100km radius.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Same-day delivery available for urgent construction needs</li>
                                <li>Vehicle assignment based on material weight and dimensions</li>
                                <li>Service hours: 6AM to 10PM, 7 days a week</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Box className="h-5 w-5 text-orange-500" />
                            2. Customer Responsibilities
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Accurate declaration of material type, weight, and dimensions</li>
                                <li>Proper packaging and securing of construction materials</li>
                                <li>Providing safe loading/unloading access at sites</li>
                                <li>Clear delivery instructions including site contact person</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.IndianRupee className="h-5 w-5 text-orange-500" />
                            3. Pricing & Payments
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Rates based on vehicle type, distance, and material weight</li>
                                <li>GST applicable on all freight charges (unless cash payment)</li>
                                <li>Full payment due before vehicle dispatch (for credit accounts)</li>
                                <li>2% daily penalty for late payments beyond 7 days</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Shield className="h-5 w-5 text-orange-500" />
                            4. Liability & Claims
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>₹10,000 maximum liability per vehicle load</li>
                                <li>Material damage claims must be reported within 24 hours</li>
                                <li>Not liable for delays due to weather or site access issues</li>
                                <li>Requires signed proof of delivery for any claims</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.AlertOctagon className="h-5 w-5 text-orange-500" />
                            5. Restricted Materials
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Explosives or flammable construction materials</li>
                                <li>Hazardous chemicals without proper documentation</li>
                                <li>Overweight loads exceeding vehicle capacity</li>
                                <li>Materials requiring special permits</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Clock className="h-5 w-5 text-orange-500" />
                            6. Cancellation Policy
                        </h2>
                        <div className="text-gray-600 text-sm space-y-3 pl-7">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Free cancellation up to 2 hours before scheduled pickup</li>
                                <li>50% charge for cancellations within 2 hours</li>
                                <li>Full charge if vehicle arrives at site and loading is refused</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acceptance Section */}
            <div className="bg-gray-50 rounded-md p-6 sm:p-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                <div className="text-gray-600 text-sm mb-6">
                    <p>
                        By booking vehicles through our platform, you agree to these Construction Transport Terms. We may update these terms with 7 days notice.
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
                        For disputes: operations@constructionlogistics.com or +91 78190 00308
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;