import { Icons } from "@/assets/assets";

export const EmptyState = () => (
    <div className="text-center py-12">
        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Icons.Truck className="text-gray-400 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-700">
            No shipments found
        </h3>
        <p className="text-gray-500 mt-1">
            You haven&apos;t created any shipments yet
        </p>
    </div>
);