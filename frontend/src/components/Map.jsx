import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet's CSS is included
import GeoCoderMarker from './GeoCoderMarker'; // Import the GeoCoderMarker component

function Map({ address, city, country }) {
  return (
    <MapContainer
      center={[51.35, 18.8]} // Default center point
      zoom={1}
      scrollWheelZoom={false} // Disable scroll zoom
      className='h-[24rem] w-full mt-5 z-0' // Set height and width
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <GeoCoderMarker address={address} city={city} country={country} />
    </MapContainer>
  );
}

export default Map;
