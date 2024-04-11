import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchBar from "../components/SearchBar";
import SEO from "../components/Seo";

export default function Home() {
  return (
    <div className="flex h-full w-full">
      <SEO
        title={"Real Estate, find your dream home"}
        description={`This real estate website features a clean and modern design, with a
          focus on helping users find their dream property.
          The website also features a search bar, allowing users to search for
          properties based on their specific needs and preferences. The search
          bar is prominently displayed on the homepage, making it easy for users
          to find and use. 
          three sections highlighting the number of years of experience, awards
          gained, and the number of properties ready. Overall, this real estate
          website is designed to be user-friendly and informative, with a focus
          on helping users find their dream property quickly and easily. The
          website's clean and modern design, combined with its prominent search
          bar and informative sections, make it an ideal choice for anyone
          looking to buy or rent real estate.`}
        img={
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        Url={"/"}
      />
      <div className="w-full flex flex-col items-center justify-center gap-y-10  lg:flex-[3] lg:pr-28">
        <h1 className="text-4xl font-bold w-full lg:text-6xl">
          Find Real Estate & Get Your Dream Place
        </h1>
        <span className="text-justify w-full">
          This real estate website features a clean and modern design, with a
          focus on helping users find their dream property. The website also
          features a search bar, allowing users to search for properties based
          on their specific needs and preferences. The search bar is prominently
          displayed on the homepage, making it easy for users to find and use.
          three sections highlighting the number of years of experience, awards
          gained, and the number of properties ready. Overall, this real estate
          website is designed to be user-friendly and informative, with a focus
          on helping users find their dream property quickly and easily. The
          website's clean and modern design, combined with its prominent search
          bar and informative sections, make it an ideal choice for anyone
          looking to buy or rent real estate.
        </span>
        <SearchBar />
        <div className="hidden w-full justify-between lg:flex">
          <div className="">
            <h2 className="text-3xl font-semibold">16+</h2>
            <span className="text-gray-500">Years of Experience</span>
          </div>
          <div className="">
            <h2 className="text-3xl font-semibold">200</h2>
            <span className="text-gray-500">Award Gained</span>
          </div>
          <div className="">
            <h2 className="text-3xl font-semibold">1200+</h2>
            <span className="text-gray-500">Property Ready</span>
          </div>
        </div>
      </div>
      <div className=" hidden h-full items-center justify-center lg:flex-[2] lg:flex">
        <LazyLoadImage
          effect="blur"
          className="h-full w-full object-cover"
          alt=""
          src={"/bg.png"}
        />
      </div>
    </div>
  );
}
