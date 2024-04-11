import { Marker, Popup } from "react-leaflet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export default function Pin({ house }) {
  return (
    <Marker position={[house.latitude, house.longitude]}>
      <Popup>
        <div className="flex gap-x-5">
          <LazyLoadImage
            src={house.images[0]}
            className="w-16 h-12 rounded-md object-cover"
            alt=""
          />
          <div className="flex flex-col justify-between">
            <Link className="link link-hover" to={`/list/${house.id}`}>
              {house.title}
            </Link>
            <span>{house.bedroom} Bedroom</span>
            <b>${house.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
