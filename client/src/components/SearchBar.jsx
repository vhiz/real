import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 10000000000,
  });
  const navigate = useNavigate();
  function switchType(val) {
    setQuery((prev) => ({ ...prev, type: val }));
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(
      `/list?type=${query.type}&city=${query?.city}&minPrice=${query?.minPrice}&maxPrice=${query?.maxPrice}`
    );
  }
  return (
    <div
      className="flex flex-col w-full gap-y-2 lg:gap-y-0"
      onSubmit={handleSubmit}
    >
      <div className="w-40 h-12 flex border-t border-x border-gray-300 cursor-pointer rounded-t-md overflow-hidden">
        <button
          onClick={() => switchType("buy")}
          className={`flex-1 btn rounded-none rounded-l-md flex items-center justify-center ${
            query.type === "buy" && "bg-black text-white"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => switchType("rent")}
          className={`flex-1 btn rounded-none rounded-r-md flex items-center justify-center ${
            query.type === "rent" && "bg-black text-white"
          }`}
        >
          Rent
        </button>
      </div>
      <form
        action=""
        className=" w-full flex flex-col items-center gap-y-2 lg:flex-row lg:w-max lg:border lg:border-gray-300"
      >
        <input
          type="text"
          placeholder="City"
          className="input rounded-none w-full border border-gray-300 focus:outline-none lg:focus:border-none"
          name="city"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Min Price"
          min={0}
          max={100000}
          className="input rounded-none w-full border border-gray-300 focus:outline-none lg:focus:border-none"
          name="minPrice"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Max Price"
          min={0}
          max={1000000000}
          className="input rounded-none w-full border border-gray-300 focus:outline-none lg:focus:border-none"
          name="maxPrice"
          onChange={handleChange}
        />
        <button className="btn rounded-none w-full btn-warning lg:w-max">
          <CiSearch className="text-white text-xl" />
        </button>
      </form>
    </div>
  );
}
