import { LazyLoadImage } from "react-lazy-load-image-component";


export default function UserInfo({ user }) {

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 bg-warning/30 h-28 w-32 rounded-md">
        <LazyLoadImage
          effect="blur"
          src={user?.img || "https://rb.gy/dc9jfv"}
          className="object-cover w-12 h-12 rounded-full"
          alt=""
          fill
        />
      <span className="font-bold">{user?.username}</span>
    </div>
  );
}
