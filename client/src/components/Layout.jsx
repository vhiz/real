import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Mobile from "./Mobile";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <div className="drawer drawer-end h-screen">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        <div className="h-[calc(100vh-100px)] px-5 lg:px-10">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side md:hidden">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Mobile />
      </div>
      <Toaster />
    </div>
  );
}
