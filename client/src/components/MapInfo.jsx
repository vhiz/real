
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PinInfo from "./PinInfo.jsx";

export default function MapInfo({ listing }) {
  return (
    <MapContainer
      center={[listing?.latitude, listing?.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PinInfo house={listing} />
    </MapContainer>
  );
}
