
const VehicleSkeleton = () => (
    <div className="flex items-center gap-4 p-4 border border-gray-100 shadow rounded-md bg-white">
        <div className="w-20 h-14 sm:w-24 sm:h-16 bg-gray-200 animate-pulse rounded"></div>
        <div className="flex flex-col gap-2 flex-grow">
            <div className="w-28 h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
        </div>
    </div>
);

export default VehicleSkeleton;
