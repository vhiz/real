import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";
export default function Map({ houses }) {
  return (
    <MapContainer
      center={[
        houses.length > 0 && houses[0].latitude,
        houses.length > 0 && houses[0].longitude,
      ]}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full h-full rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {houses.map((house, i) => (
        <Pin key={i} house={house} />
      ))}
    </MapContainer>
  );
}
