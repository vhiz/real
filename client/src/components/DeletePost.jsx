import { useState } from "react";
import { apiRequest } from "../axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DeletePost({ listing }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleDelete(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await apiRequest.delete(`/post/${listing.id}`);
      toast.success("Post has been deleted");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <dialog id="deletePost" className="modal">
      <form
        className="modal-box flex flex-col items-center w-full gap-y-4"
        onSubmit={handleDelete}
      >
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2>Are you sure you want to delete this Listing</h2>
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
