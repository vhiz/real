import { useContext, useState } from "react";
import { apiRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";

export default function DeleteUser() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await apiRequest.delete(`/user/${currentUser.id}`);
      toast.success(`${currentUser.username}'s account has been deleted.`);
      setTimeout(async () => {
        await apiRequest.post("/auth/logout");
        updateUser(null);
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <dialog id="deleteUser" className="modal">
      <form
        className="modal-box flex flex-col items-center w-full gap-y-4"
        onSubmit={handleDelete}
      >
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2>Are you sure you want to delete your account</h2>
        <button disabled={loading} type="submit" className="btn bg-red-600">
          Delete
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
