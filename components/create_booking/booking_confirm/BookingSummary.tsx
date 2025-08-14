import { FaTruck, FaBox, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';
import { ImSpinner8 } from 'react-icons/im';
import BookingDetailItem from './BookingDetailItem';
import PriceBreakdown from './PriceBreakdown';

interface BookingSummaryProps {
    vehicleType: string;
    material: string;
    weight: string |number;
    materialUnit: string;
    etaPickup: string;
    baseFare: number;
    distanceFare: number;
    estimatedPrice: number;
    isBooking: boolean;
    onConfirmBooking: () => void;
}

export default function BookingSummary({
    vehicleType,
    material,
    weight,
    materialUnit,
    etaPickup,
    baseFare,
    distanceFare,
    estimatedPrice,
    isBooking,
    onConfirmBooking,
}: BookingSummaryProps) {
    return (
        <div className="rounded-lg shadow bg-gray-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Booking Summary</h2>
            </div>

            <div className="p-4 space-y-4 text-sm">
                <BookingDetailItem
                    icon={FaTruck}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                    title="Vehicle Type"
                    value={vehicleType}
                />

                <BookingDetailItem
                    icon={FaBox}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                    title="Material"
                    value={material}
                />

                <BookingDetailItem
                    icon={GiWeight}
                    iconBg="bg-yellow-100"
                    iconColor="text-yellow-600"
                    title="Weight"
                    value={`${weight} ${materialUnit}`}
                />

                <BookingDetailItem
                    icon={FaCalendarAlt}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                    title="Pickup Time"
                    value={new Date(etaPickup).toLocaleString('en-IN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                />

                <PriceBreakdown
                    baseFare={baseFare}
                    distanceFare={distanceFare}
                    estimatedPrice={estimatedPrice}
                />

                <button
                    onClick={onConfirmBooking}
                    disabled={isBooking}
                    className={`w-full py-3 px-4 rounded-lg font-medium cursor-pointer text-white flex items-center justify-center gap-2 ${isBooking ? 'bg-black' : 'bg-black hover:bg-black/80'
                        }`}
                >
                    {isBooking ? (
                        <>
                            <ImSpinner8 className="animate-spin" />
                            Confirming...
                        </>
                    ) : (
                        <>
                            <MdPayment />
                            Confirm Booking
                        </>
                    )}
                </button>

                <div className="flex items-center gap-2 text-sm text-green-600">
                    <FaCheckCircle />
                    <span>Free cancellation up to 1 hour before pickup</span>
                </div>
            </div>
        </div>
    );
}