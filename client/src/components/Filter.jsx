import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 1000000000,
    bedroom: searchParams.get("bedroom") || 1,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    setSearchParams(query);
  }
  return (
    <div className=" w-full  flex flex-col lg:h-[10.8rem]">
      <h2 className="text-xl font-semibold">
        Search results for <b className="text-xl">{searchParams.get("city")}</b>
      </h2>
      <div className="dropdown lg:dropdown-open w-full">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 bg-transparent border-none lg:hidden"
        >
          <MdKeyboardArrowUp />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-full"
        >
          <div className="w-full">
            <label className="form-control w-full">
              <div className="label pb-0">
                <span className="label-text text-gray-500">Location</span>
              </div>
              <input
                type="text"
                className="input rounded-sm h-10 input-bordered border-gray-200 w-full focus:outline-none"
                name="city"
                defaultValue={query.city}
                onChange={handleChange}
              />
            </label>
            <div className=" w-full flex flex-col justify-between gap-y-4 lg:gap-y-0 items-center lg:flex-row">
              <label className="form-control w-full lg:w-24 lg:max-w-xs">
                <div className="label pb-0">
                  <span className="label-text  text-gray-500 text-xs">
                    Type
                  </span>
                </div>
                <select
                  name="type"
                  defaultValue={query.type}
                  onChange={handleChange}
                  className="select select-bordered  border-gray-200 w-full h-5 focus:outline-none rounded-sm text-sm"
                >
                  <option disabled selected>
                    Any
                  </option>
                  <option value={"rent"}>Rent</option>
                  <option value={"buy"}>Buy</option>
                </select>
              </label>
              <label className="form-control w-full lg:w-24 lg:max-w-xs">
                <div className="label pb-0">
                  <span className="label-text  text-gray-500 text-xs">
                    Property
                  </span>
                </div>
                <select
                  name="property"
                  defaultValue={query.property}
                  onChange={handleChange}
                  className="select select-bordered  border-gray-200 w-full h-5 focus:outline-none rounded-sm text-sm"
                >
                  <option disabled selected>
                    Any
                  </option>
                  <option value={"apartment"}>Apartment</option>
                  <option value={"house"}>House</option>
                  <option value={"condo"}>Condo</option>
                  <option value={"land"}>Land</option>
                </select>
              </label>
              <label className="form-control w-full lg:w-24 lg:max-w-xs">
                <div className="label pb-0">
                  <span className="label-text  text-gray-500 text-xs">
                    Min Price
                  </span>
                </div>
                <input
                  type="number"
                  min={0}
                  defaultValue={query.minPrice}
                  max={10000000}
                  onChange={handleChange}
                  name="minPrice"
                  className="input rounded-sm h-10 input-bordered border-gray-200 w-full focus:outline-none"
                />
              </label>
              <label className="form-control w-full lg:w-24 lg:max-w-xs">
                <div className="label pb-0">
                  <span className="label-text  text-gray-500 text-xs">
                    Max Price
                  </span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={1000000000000}
                  name="maxPrice"
                  onChange={handleChange}
                  defaultValue={query.maxPrice}
                  className="input rounded-sm h-10 input-bordered border-gray-200 w-full focus:outline-none"
                />
              </label>
              <label className="form-control w-full lg:w-24 lg:max-w-xs">
                <div className="label pb-0">
                  <span className="label-text  text-gray-500 text-xs">
                    Bedroom
                  </span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={5}
                  name="bedroom"
                  defaultValue={query.bedroom}
                  onChange={handleChange}
                  className="input rounded-sm h-10 input-bordered border-gray-200 w-full focus:outline-none"
                />
              </label>

              <button
                onClick={handleSubmit}
                className="btn btn-warning rounded-sm w-full lg:w-24 lg:mt-3 text-white "
              >
                <CiSearch className="text-2xl" />
              </button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
