'use client';

import SelectVehicaleType from '@/components/trips/SelectVehicaleType';
import React, { Suspense } from 'react';


export default function VehicaleTypePage() {
    return (
        <Suspense fallback={<div>Loading vehicle types...</div>}>
            <SelectVehicaleType />
        </Suspense>
    );
}
