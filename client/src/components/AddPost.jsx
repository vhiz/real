import AddForm from "./AddForm";

export default function AddPost() {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box max-w-[100vw] lg:max-w-[80vw]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="text-2xl font-semibold">Add Post</h2>
        <AddForm />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
