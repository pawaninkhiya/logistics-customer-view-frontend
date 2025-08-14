import { Icons } from '@/assets/assets';
interface RouteOverviewProps {
    from: string;
    to: string;
    distance: string;
    duration: string;
}

export default function RouteOverview({ from, to, distance, duration }: RouteOverviewProps) {
    return (
        <div className="p-4 shadow rounded md border border-gray-200 mb-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <Icons.Map className="text-red-500" /> Route Overview
            </h2>
            <div className="p-4">
                <div className="grid 2xl:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">From</h3>
                        <p className="font-medium">{from}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">To</h3>
                        <p className="font-medium">{to}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Distance</h3>
                        <p className="font-medium">{distance || 'Calculating...'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Estimated Time</h3>
                        <p className="font-medium">{duration || 'Calculating...'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}