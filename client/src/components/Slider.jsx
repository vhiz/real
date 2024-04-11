import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Slider({ listing }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-80 gap-x-2">
      <div
        className={`${
          open ? "fixed scale-[1]" : "hidden scale-0"
        }  top-0 left-0 w-screen h-screen duration-300 transition-all flex justify-center bg-black z-[999]`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-[999] btn text-2xl"
        >
          <IoMdClose />
        </button>
        <div className="carousel w-full h-full ">
          {listing?.images?.map((img, i) => (
            <div
              key={i}
              id={`item${i + 1}`}
              className="carousel-item relative w-full h-full"
            >
              <LazyLoadImage
                src={img}
                className=" object-cover w-full"
                alt=""
              />
            </div>
          ))}
          <div className="absolute flex justify-center w-full bg-gray-400/60 py-2 gap-4 bottom-0">
            {listing?.images?.map((img, i) => (
              <a
                key={i}
                href={`#item${i + 1}`}
                className="rounded-md w-20 h-20 overflow-hidden"
              >
                <LazyLoadImage
                  src={img}
                  alt=""
                  className="object-cover w-full h-full"
                  fill
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        className="relative flex-[3] h-full overflow-hidden rounded-md group"
        onClick={() => setOpen(true)}
      >
        <a href="#item1" className="h-full w-full">
          <LazyLoadImage
            src={listing?.images && listing?.images[0]}
            className=" group-hover:scale-[1.1] duration-300 transition-all w-full h-full object-cover"
            alt=""
          />
        </a>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        {listing?.images?.slice(1)?.map((img, i) => (
          <div
            key={i}
            className="relative h-24 overflow-hidden rounded-md group"
            onClick={() => setOpen(true)}
          >
            <a href={`#item${i + 2}`} className="h-full w-full">
              <LazyLoadImage
                src={img}
                alt=""
                className="group-hover:scale-[1.1] duration-300 transition-all w-full h-full object-cover"
                fill
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
