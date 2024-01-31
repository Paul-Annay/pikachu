import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);

    return (
        <div className="map-container">
            <MapContainer
                className="map-container"
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {/* {radioStations.map(
                    (station) =>
                        station.geo_lat &&
                        station.geo_long && (
                            <Marker
                                key={station.changeuuid}
                                position={[station.geo_lat, station.geo_long]}
                            >
                                <Popup>
                                    <span>{station.emoji}</span>
                                    <span>{station.cityName}</span>
                                </Popup>
                            </Marker>
                        )
                )} */}
            </MapContainer>
        </div>
    );
}

export default Map;
