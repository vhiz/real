import { BiHomeAlt } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Toggle from "./Toggle";
import { apiRequest } from "../axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import notificationStore from "../notificationStore";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetch, number } = notificationStore();
  const { currentUser, updateUser } = useContext(AuthContext);
  async function handleSignOut(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await apiRequest.post("/auth/logout");
      navigate("/");
      updateUser(null);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);
  return (
    <div className="flex justify-between h-[100px] w-full p-5 items-center lg:p-10">
      <div className="flex items-center gap-x-5">
        <Link
          to={"/"}
          className="flex items-center gap-x-2 font-bold text-xl hover:scale-[1.03] duration-300"
        >
          <BiHomeAlt className="text-xl font-bold" />
          <span className="text-xl md:hidden lg:block">RealEstate</span>
        </Link>
        <ul className="menu menu-vertical hidden rounded-box gap-x-5 md:menu-horizontal">
          <li className="">
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/list"}>Listing</Link>
          </li>
          <li>
            <Link to={"/"}>Contact</Link>
          </li>
          <li>
            <Link to={"/"}>Agents</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-x-3 items-center">
        <Toggle />

        {currentUser ? (
          <div className="flex items-center gap-x-3">
            <Link to={"/profile"}>
              <LazyLoadImage
                src={currentUser?.img || "https://rb.gy/dc9jfv"}
                alt=""
                effect="blur"
                className="object-cover w-12 h-12 rounded-full"
              />
            </Link>
            <span className="text-semibold hidden md:flex capitalize">
              {currentUser?.username}
            </span>
            <Link
              to={"/profile"}
              className="btn rounded-md relative hidden md:flex"
            >
              {number > 0 && (
                <div className="badge badge-error badge-sm h-5 w-5 text-white absolute -top-2 -right-[0.7rem]">
                  <span className="text-xs">{number}</span>
                </div>
              )}
              Profile
            </Link>
            <form className="hidden md:block" onSubmit={handleSignOut}>
              <button
                type="submit"
                disabled={loading}
                className="btn rounded-md ml-3 btn-error text-base-100"
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <div className="hidden gap-x-4 md:flex">
            <Link to={"/login"} className="btn rounded-lg">
              SignIn
            </Link>
            <Link to={"/register"} className="btn btn-warning rounded-lg">
              SignUp
            </Link>
          </div>
        )}
        <label
          htmlFor="my-drawer"
          className="btn btn-circle swap swap-rotate md:hidden"
        >
          <input type="checkbox" />
          <CiMenuBurger className="swap-off fill-current" />
          <IoIosClose className="swap-on fill-current" />
        </label>
      </div>
    </div>
  );
}
