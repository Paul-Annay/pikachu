import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useStation } from "../contexts/StationContext";

function Map() {
    const mapPosition = [40, 0];
    const { stations } = useStation();

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
                {stations.map(
                    (station) =>
                        station.geo_lat &&
                        station.geo_long && (
                            <Marker
                                key={station.changeuuid}
                                position={[station.geo_lat, station.geo_long]}
                            >
                                <Popup>
                                    <span>{station.name}</span>
                                    <span>{station.country}</span>
                                </Popup>
                            </Marker>
                        )
                )}
            </MapContainer>
        </div>
    );
}

export default Map;
