import React, { useState, useEffect, useRef } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";

interface VenueLocationProps {
  latitude: number;
  longitude: number;
  venueName: string;
}

const VenueLocation: React.FC<VenueLocationProps> = ({
  latitude,
  longitude,
  venueName,
}) => {
  const [center, setCenter] = useState<[number, number]>([latitude, longitude]);
  const [zoom, setZoom] = useState<number>(15);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setCenter([latitude, longitude]);
  }, [latitude, longitude]);

  const handleZoomIn = () => {
    setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    setZoom(zoom - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-thin mb-4 tracking-widest">VENUE LOCATION</h2>
      <div className="w-full h-96 relative">
        <Map
          center={center}
          zoom={zoom}
          defaultWidth={600}
          defaultHeight={400}
          ref={mapRef}
          attribution={false}
        >
          <Marker anchor={center} />
          <Overlay anchor={[latitude, longitude + 0.002]} offset={[120, 20]}>
            <div className="bg-white p-2 rounded-md shadow-md text-sm">
              {venueName}
            </div>
          </Overlay>
        </Map>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleZoomIn}
        >
          Zoom In
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleZoomOut}
        >
          Zoom Out
        </button>
      </div>
    </div>
  );
};

export default VenueLocation;
