import { useContext, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { apiRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadImg from "./UploadImg";

export default function ProfileUpdate() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const onChangeCheckbox = () => {
    setChecked(!checked);
  };
  const [avatar, setAvatar] = useState([]);
  const [input, setInput] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInput = Object.entries(input).reduce((acc, curr) => {
      if (curr[1]) acc[curr[0]] = curr[1];
      return acc;
    }, {});

    try {
      setLoading(true);
      const res = await apiRequest.put(`/user/${currentUser.id}`, {
        ...newInput,
        img: avatar[0] ? avatar[0] : currentUser.img,
      });
      updateUser(res.data);
      setAvatar([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <form
        className="modal-box flex flex-col gap-y-4 "
        onSubmit={handleSubmit}
      >
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex gap-4 flex-col lg:flex-row justify-between">
          <div className="flex flex-col gap-y-4 justify-between">
            <label className="input input-bordered h-[4rem] flex items-center gap-2">
              <AiOutlineMail className="opacity-70" />

              <input
                type="email"
                className="grow"
                placeholder={currentUser.email}
                name="email"
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered h-[4rem] flex items-center gap-2">
              <CiUser className="opacity-70" />
              <input
                type="text"
                className="grow"
                placeholder={currentUser.username}
                name="username"
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered h-[4rem] flex items-center gap-2">
              <IoKeyOutline className="opacity-70" />

              <input
                type={checked ? "text" : "password"}
                className="grow"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
              <label className="swap swap-rotate">
                <input type="checkbox" onChange={onChangeCheckbox} />
                <FaRegEye className="swap-on" />
                <FaRegEyeSlash className="swap-off" />
              </label>
            </label>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-4">
            <LazyLoadImage
              src={avatar[0] || currentUser.img}
              alt=""
              effect="blur"
              className=" w-20 h-20 lg:w-40 lg:h-40 rounded-full object-cover"
            />
            <UploadImg
              uwConfig={{
                cloudName: "dsemmhzl3",
                uploadPreset: "realEstate",
                multiple: false,
                maxImageFileSize: 2000000,
                folder: "profile",
              }}
              setState={setAvatar}
            />
          </div>
        </div>

        <button disabled={loading} type="submit" className="btn">
          Update
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
