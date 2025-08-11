import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

type Props = {
    message: string;
};

const VehicleError: React.FC<Props> = ({ message }) => (
    <div className="flex items-center gap-2 bg-red-100 text-red-700 p-4 rounded-lg">
        <FaInfoCircle />
        <span>{message}</span>
    </div>
);

export default VehicleError;
