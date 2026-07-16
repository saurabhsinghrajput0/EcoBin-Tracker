import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customMarker = new L.DivIcon({
  className: 'custom-icon',
  html: `<div style="background-color: #10B981; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(16,185,129,0.8);"></div>`,
  iconSize: [20, 20],
});

const criticalMarker = new L.DivIcon({
  className: 'custom-icon-critical',
  html: `<div style="background-color: #EF4444; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(239,68,68,0.8); animation: pulse 2s infinite;"></div>`,
  iconSize: [20, 20],
});

const MapWidget = () => {
  const center = [37.7749, -122.4194]; // San Francisco as mock data

  return (
    <div className="h-[300px] w-full rounded-2xl overflow-hidden relative border border-white/40 dark:border-white/10 shadow-glass">
      <div className="absolute top-4 left-4 z-[400] bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-sm flex items-center gap-2">
        <MapPin size={16} className="text-primary-500" />
        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">Live Route Map</span>
      </div>
      
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%', zIndex: 10 }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={[37.7749, -122.4194]} icon={customMarker}>
          <Popup>Downtown Central Bin - Clean</Popup>
        </Marker>
        <Marker position={[37.7849, -122.4094]} icon={criticalMarker}>
          <Popup>Financial District - Full (Critical)</Popup>
        </Marker>
        <Marker position={[37.7649, -122.4294]} icon={customMarker}>
          <Popup>Mission District - Half Full</Popup>
        </Marker>
        <CircleMarker center={[37.7749, -122.4194]} radius={40} pathOptions={{ color: '#10B981', fillColor: '#10B981', fillOpacity: 0.1, stroke: false }} />
      </MapContainer>
    </div>
  );
};

export default MapWidget;
