import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

// Custom Leaflet icon for the location marker
const locationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Replace with your desired icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 32], // Center the icon at its bottom point
  popupAnchor: [0, -32],
});

function GeoCoderMarker({ address, city, country }) {
  const map = useMap(); // Get the map instance
  const [position, setPosition] = useState([60, 19]); // Default position

  useEffect(() => {
    // Construct the full address
    const fullAddress = `${address}, ${city}, ${country}`;

    // Geocode the address to get latitude and longitude
    axios
      .get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: fullAddress,
          format: 'json',
        },
      })
      .then((response) => {
        if (response.data && response.data[0]) {
          const { lat, lon } = response.data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
          map.setView([lat, lon], 13); // Center map to the geocoded position
        }
      })
      .catch((error) => {
        console.error('Error geocoding the address:', error);
      });
  }, [address, city, country, map]);

  useEffect(() => {
    // Update marker position dynamically as the map zooms
    const handleZoom = () => {
      map.setView(position);
    };

    map.on('zoomend', handleZoom);

    return () => {
      map.off('zoomend', handleZoom); // Clean up event listener on component unmount
    };
  }, [map, position]);

  return (
    <Marker position={position} icon={locationIcon}>
      <Popup>{`${address}, ${city}, ${country}`}</Popup>
    </Marker>
  );
}

export default GeoCoderMarker;
