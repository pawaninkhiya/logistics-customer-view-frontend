interface PriceBreakdownProps {
  baseFare: number;
  distanceFare: number;
  estimatedPrice: number;
}

export default function PriceBreakdown({ baseFare, distanceFare, estimatedPrice }: PriceBreakdownProps) {
  return (
    <div className="pt-4 border-t">
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Base Fare</span>
        <span className="font-medium">₹{baseFare}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Distance Fare</span>
        <span className="font-medium">₹{distanceFare}</span>
      </div>
      <div className="flex justify-between text-lg font-bold pt-2 border-t">
        <span>Total Amount</span>
        <span>₹{estimatedPrice}</span>
      </div>
    </div>
  );
}