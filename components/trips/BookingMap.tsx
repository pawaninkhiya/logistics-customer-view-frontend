'use client';

import { useCallback, useState } from 'react';
import {
    useJsApiLoader,
    GoogleMap,
    DirectionsService,
    DirectionsRenderer
} from '@react-google-maps/api';

interface BookingMapProps {
    from_latitude: number;
    from_longitude: number;
    to_latitude: number;
    to_longitude: number;
    onRouteCalculated?: (distance: string, duration: string) => void;
}

const LIBRARIES: ('drawing' | 'geometry' | 'places' | 'visualization')[] = ['places'];

const BookingMap: React.FC<BookingMapProps> = ({from_latitude,from_longitude,to_latitude,    to_longitude,onRouteCalculated}) => {
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [hasCalculated, setHasCalculated] = useState(false);

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: LIBRARIES,
    });

    const directionsCallback = useCallback(
        (response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
            if (status === 'OK' && response) {
                setDirections(response);

                const leg = response.routes[0].legs[0];
                if (onRouteCalculated) {
                    onRouteCalculated(
                        leg.distance?.text || '',
                        leg.duration?.text || ''
                    );
                }

                if (map && response.routes[0].bounds && !hasCalculated) {
                    map.fitBounds(response.routes[0].bounds);
                    setHasCalculated(true);
                }
            }
        },
        [map, hasCalculated, onRouteCalculated]
    );

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const center = {
        lat: (from_latitude + to_latitude) / 2,
        lng: (from_longitude + to_longitude) / 2,
    };

    if (!isLoaded) return null; // Prevent rendering until API is loaded

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '300px', borderRadius: "10px" }}
            zoom={10}
            center={center}
            onLoad={onLoad}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                draggable: false,
            }}
        >
            {!hasCalculated && (
                <DirectionsService
                    options={{
                        destination: { lat: to_latitude, lng: to_longitude },
                        origin: { lat: from_latitude, lng: from_longitude },
                        travelMode: google.maps.TravelMode.DRIVING,
                    }}
                    callback={directionsCallback}
                />
            )}

            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
};

export default BookingMap;
