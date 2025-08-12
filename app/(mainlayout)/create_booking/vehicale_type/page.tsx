'use client';

import SelectVehicaleType from '@/components/create_booking/SelectVehicaleType';
import React, { Suspense } from 'react';


export default function VehicaleTypePage() {
    return (
        <Suspense fallback={<div>Loading vehicle types...</div>}>
            <SelectVehicaleType />
        </Suspense>
    );
}
