import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios'; // Axios for geocoding
import L from 'leaflet'; // Import Leaflet for custom icon and animation

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
          setPosition([lat, lon]);
          map.setView([lat, lon], 13); // Set the map center to the geocoded position

          // Apply bounce animation to the marker when position is set
          const marker = L.marker([lat, lon]).addTo(map);
          marker.bounce(); // This bounces the marker
        }
      })
      .catch((error) => {
        console.error('Error geocoding the address:', error);
      });
  }, [address, city, country, map]);

  return (
    <Marker position={position}>
      <Popup>{`${address}, ${city}, ${country}`}</Popup>
    </Marker>
  );
}

export default GeoCoderMarker;
