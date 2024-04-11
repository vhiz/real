import { useContext, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../axios";
export default function Mobile() {
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);

  async function handleSignOut(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await apiRequest.post("/auth/logout");
      updateUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex items-center justify-center gap-y-6">
      <label htmlFor="my-drawer">
        <li>
          <Link className="text-4xl" to={"/"}>
            Home
          </Link>
        </li>
      </label>
      <label htmlFor="my-drawer">
        <li>
          <Link className="text-4xl" to={"/list"}>
            Listing
          </Link>
        </li>
      </label>
      <label htmlFor="my-drawer">
        <li>
          <Link className="text-4xl" to={"/"}>
            Contact
          </Link>
        </li>
      </label>
      <label htmlFor="my-drawer">
        <li>
          <Link className="text-4xl" to={"/"}>
            Agents
          </Link>
        </li>
      </label>
      {currentUser ? (
        <form onSubmit={handleSignOut}>
          <button
            disabled={loading}
            className="btn rounded-md ml-3 btn-error text-base-100"
          >
            <CiLogout className="text-2xl" />
          </button>
        </form>
      ) : (
        <>
          <label htmlFor="my-drawer">
            <li>
              <Link className="text-4xl" to={"/login"}>
                SignIn
              </Link>
            </li>
          </label>
          <label htmlFor="my-drawer">
            <li>
              <Link className="text-4xl" to={"/register"}>
                SignUp
              </Link>
            </li>
          </label>
        </>
      )}
    </ul>
  );
}
