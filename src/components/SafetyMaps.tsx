import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, MapPin, Home } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

// Mock data for disasters and shelters
const disasters = [
  { id: 1, type: 'Flood', location: { lat: 34.052235, lng: -118.243683 }, severity: 'High' },
  { id: 2, type: 'Wildfire', location: { lat: 34.069444, lng: -118.445278 }, severity: 'Medium' },
];

const shelters = [
  { id: 1, name: 'City Hall Shelter', location: { lat: 34.054208, lng: -118.242766 } },
  { id: 2, name: 'Community Center', location: { lat: 34.052030, lng: -118.243700 } },
];

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 34.052235,
  lng: -118.243683
};

const SafetyMaps: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisaster, setSelectedDisaster] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY_HERE" // Replace with your actual API key
  });

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Safety Maps & Evacuation Routes</h1>
      
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
              >
                {disasters.map((disaster) => (
                  <Marker
                    key={disaster.id}
                    position={disaster.location}
                    onClick={() => setSelectedDisaster(disaster)}
                  />
                ))}
                {shelters.map((shelter) => (
                  <Marker
                    key={shelter.id}
                    position={shelter.location}
                    icon={{
                      url: '/shelter-icon.png', // Replace with your shelter icon
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                ))}
                {selectedDisaster && (
                  <InfoWindow
                    position={selectedDisaster.location}
                    onCloseClick={() => setSelectedDisaster(null)}
                  >
                    <div>
                      <h2>{selectedDisaster.type} Alert</h2>
                      <p>Severity: {selectedDisaster.severity}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            ) : <div>Loading...</div>}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Legend</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                <span>Disaster Area</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 text-green-500 mr-2" />
                <span>Shelter</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyMaps;