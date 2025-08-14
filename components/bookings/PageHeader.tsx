import { Icons } from "@/assets/assets";

export const PageHeader = () => (
    <>
        <header className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-md p-6 border border-orange-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                    <Icons.Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                    <h2 className="xl:text-lg text-base md:font-semibold text-gray-900 mb-1">
                        Your Bookings
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Manage and track your cargo shipments
                    </p>
                </div>
        </header>
    </>
);