import { Marker, Popup } from "react-leaflet";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PinInfo({ house }) {
  return (
    <Marker position={[house?.latitude, house?.longitude]}>
      <Popup>
        <div className="flex gap-x-5">
          <LazyLoadImage
            effect="blur"
            src={house.images && house?.images[0]}
            className="object-cover w-16 h-12 rounded-md"
            alt=""
            fill
          />
          <div className="flex flex-col justify-between">
            <span>{house.title}</span>
            <span>{house.bedroom} Bedroom</span>
            <b>${house.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
