import { Icons } from "@/assets/assets";

interface TripFooterProps {
    hasAcceptedDriver: boolean;
}

export const TripFooter = ({ hasAcceptedDriver }: TripFooterProps) => (
    <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
            {hasAcceptedDriver ? (
                <>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Driver assigned</span>
                </>
            ) : (
                <>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Searching for driver</span>
                </>
            )}
        </div>
    {/* <button className="text-xs font-medium flex items-center gap-2 text-white rounded-md bg-black hover:bg-gray-800 transition-colors py-2 px-5">
            View <Icons.ArrowRight className="w-3 h-3" />
        </button> */}
    </div>
);