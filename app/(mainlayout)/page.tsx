"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Icons } from "@assets/assets";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/navigation";
import CustomSelect from "@components/ui/CustomSelect";
import { useGetAllMaterialQuery } from "@/services/materials/materials";

interface LocationData {
    from: string;
    to: string;
    from_latitude: number;
    from_longitude: number;
    to_latitude: number;
    to_longitude: number;
    distance: number;
    material: string;
    material_unit: string;
    weight: number;
    eta_pickup: string;
}


const unitOptions = [
    { label: "kg", value: "kg" },
    { label: "g", value: "g" },
    { label: "lb", value: "lb" },
];

export default function HomePage() {
    const { data } = useGetAllMaterialQuery()
    const router = useRouter();
    const [formData, setFormData] = useState<LocationData>({
        from: "",
        to: "",
        from_latitude: 0,
        from_longitude: 0,
        to_latitude: 0,
        to_longitude: 0,
        distance: 0,
        material: "",
        material_unit: "kg",
        weight: 0,
        eta_pickup: "",
    });
    const [loading, setLoading] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
    const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });

    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
    const geocoder = useRef<google.maps.Geocoder | null>(null);
    const markers = useRef<{ from: google.maps.Marker | null; to: google.maps.Marker | null; }>({ from: null, to: null });
    const roadHighlight = useRef<google.maps.Polyline | null>(null);



    const materialOptions = useMemo(() => data?.data.map(({ _id, name }: any) => ({
        label: name,
        value: _id
    })) || [], [data?.data]);

    // Initialize Google Maps
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            version: "weekly",
            libraries: ["places", "geometry"],
        });

        loader.load().then(() => {
            setMapLoaded(true);
            autocompleteService.current = new google.maps.places.AutocompleteService();
            geocoder.current = new google.maps.Geocoder();

            if (mapRef.current) {
                mapInstance.current = new google.maps.Map(mapRef.current, {
                    center: mapCenter,
                    zoom: 5,
                    disableDefaultUI: true,
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }],
                        },
                        {
                            featureType: "transit",
                            elementType: "labels.icon",
                            stylers: [{ visibility: "off" }],
                        },
                    ],
                });

                // Initialize directions renderer with enhanced route styling
                const renderer = new google.maps.DirectionsRenderer({
                    suppressMarkers: true,
                    polylineOptions: {
                        strokeColor: "#3366FF",
                        strokeOpacity: 0.9,
                        strokeWeight: 7,
                        zIndex: 1,
                    },
                    preserveViewport: false,
                });
                renderer.setMap(mapInstance.current);
                setDirectionsRenderer(renderer);

                // Add secondary outline for better visibility
                const outlineRenderer = new google.maps.DirectionsRenderer({
                    suppressMarkers: true,
                    suppressInfoWindows: true,
                    polylineOptions: {
                        strokeColor: "#FFFFFF",
                        strokeOpacity: 0.7,
                        strokeWeight: 10,
                        zIndex: 0,
                    },
                });
                outlineRenderer.setMap(mapInstance.current);

                placesService.current = new google.maps.places.PlacesService(
                    mapInstance.current
                );
            }
        });

        return () => {
            if (mapInstance.current) {
                google.maps.event.clearInstanceListeners(mapInstance.current);
            }
        };
    }, []);

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof LocationData
    ) => {
        const { value } = e.target;

        // Clear location data if input is empty
        if ((field === "from" || field === "to") && value === "") {
            clearLocation(field);
            return;
        }

        setFormData((prev) => ({ ...prev, [field]: value }));

        if ((field === "from" || field === "to") && value.length > 2 && mapLoaded) {
            getPlacePredictions(value, field);
        } else {
            setPredictions([]);
        }
    };

    // Clear location data and map markers
    const clearLocation = (field: "from" | "to") => {
        // Clear form data
        setFormData(prev => ({
            ...prev,
            [field]: "",
            [`${field}_latitude`]: 0,
            [`${field}_longitude`]: 0,
            distance: 0
        }));

        // Clear map markers
        if (markers.current[field]) {
            markers.current[field]?.setMap(null);
            markers.current[field] = null;
        }

        // Clear directions if one location is empty
        if (directionsRenderer) {
            directionsRenderer.setDirections({ routes: [] } as any);
        }

        // Clear road highlight
        if (roadHighlight.current) {
            roadHighlight.current.setMap(null);
            roadHighlight.current = null;
        }

        // Reset map view if both locations are cleared
        if (formData.from === "" && formData.to === "") {
            mapInstance.current?.setCenter(mapCenter);
            mapInstance.current?.setZoom(5);
        }
    };

    // Handle select changes
    const handleSelectChange = (field: keyof LocationData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Get place predictions
    const getPlacePredictions = (input: string, field: "from" | "to") => {
        setActiveField(field);
        autocompleteService.current?.getPlacePredictions(
            { input, componentRestrictions: { country: "in" } },
            (predictions, status) => {
                if (status === "OK" && predictions) {
                    setPredictions(predictions);
                } else {
                    setPredictions([]);
                }
            }
        );
    };

    // Handle place selection from dropdown
    const handlePlaceSelect = (placeId: string, field: "from" | "to") => {
        if (!placesService.current) return;

        placesService.current.getDetails({ placeId }, (place, status) => {
            if (status === "OK" && place?.geometry?.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const address = place.formatted_address || "";

                handlePlaceSelectByCoordinates(lat, lng, address, field);
            }
        });
    };

    // Handle place selection by coordinates
    const handlePlaceSelectByCoordinates = (
        lat: number,
        lng: number,
        address: string,
        field: "from" | "to"
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: address,
            [`${field}_latitude`]: lat,
            [`${field}_longitude`]: lng,
        }));

        updateMap(field, lat, lng, address);

        // Automatically calculate route if both locations are set
        if ((field === "from" && formData.to) || (field === "to" && formData.from)) {
            calculateRoute();
        } else {
            // Center map on the selected location
            mapInstance.current?.panTo({ lat, lng });
            mapInstance.current?.setZoom(12);
        }

        setPredictions([]);
        setActiveField(null);
    };

    // Update map with markers
    const updateMap = (
        field: "from" | "to",
        lat: number,
        lng: number,
        address: string
    ) => {
        if (!mapInstance.current) return;

        // Remove existing marker
        if (markers.current[field]) {
            markers.current[field]?.setMap(null);
        }

        // Add new marker with custom icon
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map: mapInstance.current,
            title: field === "from" ? "Pickup Location" : "Delivery Location",
            icon: {
                url: field === "from"
                    ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                scaledSize: new google.maps.Size(40, 40),
            },
            zIndex: 2,
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<div class="font-medium">${field === "from" ? "Pickup" : "Delivery"}</div>
                <div class="text-sm">${address}</div>`
        });

        marker.addListener("click", () => {
            infoWindow.open(mapInstance.current, marker);
        });

        markers.current[field] = marker;
    };

    // Calculate route and distance with enhanced highlighting
    const calculateRoute = () => {
        if (
            !formData.from_latitude ||
            !formData.from_longitude ||
            !formData.to_latitude ||
            !formData.to_longitude ||
            !directionsRenderer
        )
            return;

        const directionsService = new google.maps.DirectionsService();
        const from = new google.maps.LatLng(
            formData.from_latitude,
            formData.from_longitude
        );
        const to = new google.maps.LatLng(formData.to_latitude, formData.to_longitude);

        directionsService.route(
            {
                origin: from,
                destination: to,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: false,
                optimizeWaypoints: true,
            },
            (response, status) => {
                if (status === "OK" && response) {
                    directionsRenderer.setDirections(response);
                    const route = response.routes[0];
                    let distance = 0;
                    route.legs.forEach((leg) => {
                        if (leg.distance) distance += leg.distance.value;
                    });

                    const distanceKm = distance / 1000;
                    setFormData((prev) => ({
                        ...prev,
                        distance: parseFloat(distanceKm.toFixed(2)),
                    }));

                    // Fit bounds to show entire route with padding
                    const bounds = new google.maps.LatLngBounds();
                    route.legs.forEach(leg => {
                        bounds.extend(leg.start_location);
                        bounds.extend(leg.end_location);
                    });

                    mapInstance.current?.fitBounds(bounds, {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100,
                    });

                    // Clear previous highlight if exists
                    if (roadHighlight.current) {
                        roadHighlight.current.setMap(null);
                    }

                    // Highlight the road path more prominently
                    const path = response.routes[0].overview_path;
                    roadHighlight.current = new google.maps.Polyline({
                        path: path,
                        geodesic: true,
                        strokeColor: "#FF6B00",
                        strokeOpacity: 0.7,
                        strokeWeight: 8,
                        zIndex: 3
                    });
                    roadHighlight.current.setMap(mapInstance.current);
                }
            }
        );
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);

        // Validate form
        if (
            !formData.from ||
            !formData.to ||
            !formData.material ||
            !formData.weight ||
            !formData.eta_pickup
        ) {
            alert("Please fill all required fields");
            setLoading(false);
            return;
        }

        // Navigate to next page with form data
        router.push(
            `/trip/vehicale_type?data=${encodeURIComponent(
                JSON.stringify(formData)
            )}`
        );
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Left Column */}
            <div className="flex-1 bg-white rounded-xl ">
                <form onSubmit={handleSubmit} className=" space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Pickup Location */}
                        <div className="flex-1 relative shadow p-5 rounded-md border-gray-200 border">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pickup Location*
                            </label>
                            <div className="relative">
                                <input
                                    ref={fromInputRef}
                                    type="text"
                                    value={formData.from}
                                    onChange={(e) => handleInputChange(e, "from")}
                                    onFocus={() => setActiveField("from")}
                                    placeholder="Enter pickup address"
                                    className="w-full px-4 py-3 text-xs placeholder:text-xs sm:placeholder:text-sm sm:text-sm border rounded-md focus:outline-none transition-all duration-200 ease-in-out border-gray-300 focus:ring-2 focus:ring-black/50 hover:border-gray-400 font-medium placeholder:font-medium"
                                    required
                                />
                                {formData.from && (
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => clearLocation("from")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                                {activeField === "from" && predictions.length > 0 && (
                                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
                                        <ul className="py-1 max-h-60 overflow-auto">
                                            {predictions.map((prediction) => (
                                                <li
                                                    key={prediction.place_id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                                    onClick={() =>
                                                        handlePlaceSelect(prediction.place_id, "from")
                                                    }
                                                >
                                                    {prediction.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Delivery Location */}
                        <div className="flex-1 relative shadow p-5 rounded-md border-gray-200 border">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Delivery Location*
                            </label>
                            <div className="relative">
                                <input
                                    ref={toInputRef}
                                    type="text"
                                    value={formData.to}
                                    onChange={(e) => handleInputChange(e, "to")}
                                    onFocus={() => setActiveField("to")}
                                    placeholder="Enter delivery address"
                                    className="w-full px-4 py-3 text-xs placeholder:text-xs sm:placeholder:text-sm sm:text-sm border rounded-md focus:outline-none transition-all duration-200 ease-in-out border-gray-300 focus:ring-2 focus:ring-black/50 hover:border-gray-400 font-medium placeholder:font-medium"
                                    required
                                />
                                {formData.to && (
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => clearLocation("to")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                                {activeField === "to" && predictions.length > 0 && (
                                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
                                        <ul className="py-1 max-h-60 overflow-auto">
                                            {predictions.map((prediction) => (
                                                <li
                                                    key={prediction.place_id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                                    onClick={() =>
                                                        handlePlaceSelect(prediction.place_id, "to")
                                                    }
                                                >
                                                    {prediction.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Shipment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="shadow p-5 rounded-md border-gray-200 border">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Material Type*
                            </label>
                            <CustomSelect
                                id="material"
                                label="Material Type"
                                options={materialOptions}
                                value={formData.material}
                                setFieldValue={(value) => handleSelectChange("material", value)}
                                isLabel={false}
                            />
                        </div>

                        <div className="shadow p-5 rounded-md border-gray-200 border">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Weight ({formData.material_unit})*
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange(e, "weight")}
                                    placeholder="0"
                                    className="w-1/2 px-4 py-3 text-xs sm:text-sm border rounded-md focus:outline-none transition-all duration-200 ease-in-out border-gray-300 focus:ring-2 focus:ring-black/50 hover:border-gray-400 font-medium"
                                    required
                                    min="0"
                                    step="0.1"
                                />
                                <div className="ml-2 w-1/2">
                                    <CustomSelect
                                        id="material_unit"
                                        label="Unit"
                                        options={unitOptions}
                                        value={formData.material_unit}
                                        setFieldValue={(value) => handleSelectChange("material_unit", value)}
                                        isLabel={false}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="shadow p-5 rounded-md border-gray-200 border">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pickup Date/Time*
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.eta_pickup}
                                onChange={(e) => handleInputChange(e, "eta_pickup")}
                                className="w-full px-4 py-3 text-xs sm:text-sm border rounded-md focus:outline-none transition-all duration-200 ease-in-out border-gray-300 focus:ring-2 focus:ring-black/50 hover:border-gray-400 font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Map Preview */}
                    <div className="relative">
                        <div
                            ref={mapRef}
                            className="w-full h-64 rounded-lg border border-gray-200 mt-4"
                        />
                        {formData.distance > 0 && (
                            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md z-10">
                                <p className="text-sm font-medium">Distance: {formData.distance} km</p>
                            </div>
                        )}
                    </div>

                    {/* Route Information */}
                    {formData.distance > 0 && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                            <p className="font-medium text-blue-800">Route Information</p>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-xs text-gray-500">Distance</p>
                                    <p className="font-medium">{formData.distance} km</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Est. Duration</p>
                                    <p className="font-medium">
                                        {Math.ceil(formData.distance / 40)}-{Math.ceil(formData.distance / 30)} hours
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-black hover:bg-black/80 text-white font-medium rounded-md shadow-sm transition-colors duration-200 ease-in-out text-sm"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Continue to Confirm"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/3 bg-gray-50 rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Delivery Summary
                </h3>
                <div className="space-y-4">
                    {!formData.from || !formData.to ? (
                        <p className="text-gray-500 text-sm">
                            Enter both locations to see available delivery options.
                        </p>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-800">Route Summary</h4>
                                <div className="flex items-start gap-3">
                                    <div className="flex flex-col items-center pt-1">
                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                                            <span className="text-white text-xs">P</span>
                                        </div>
                                        <div className="w-px h-8 bg-gray-300 my-1"></div>
                                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                            <span className="text-white text-xs">D</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                            {formData.from}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-6 line-clamp-2">
                                            {formData.to}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {formData.distance > 0 && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500">Distance</p>
                                        <p className="font-medium">{formData.distance} km</p>
                                    </div>
                                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500">Material</p>
                                        <p className="font-medium">{formData.material || "-"}</p>
                                    </div>
                                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500">Weight</p>
                                        <p className="font-medium">
                                            {formData.weight
                                                ? `${formData.weight} ${formData.material_unit}`
                                                : "-"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                        <p className="text-blue-800 text-sm font-medium">
                            Pro tip: Save your frequent locations for faster booking!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}