import { useContext, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  //check if the input checkbox is checked
  const onChangeCheckbox = () => {
    setChecked(!checked);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest.post("/auth/login", inputs);
      updateUser(res.data);
      navigate("/");
    } catch (error) {
      toast(error.response.data, {
        icon: <CiUser className="text-2xl" />,
        className: "flex gap-2",
      });
      console.log(error.response);
      setError(error.response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-full flex flex-col gap-y-4 " onSubmit={handleSubmit}>
      <label className={`input input-bordered rounded-md flex items-center gap-2 ${
          error?.status === 404 ? "input-error animate-shakeX" : ""
        }`}>
        <CiUser className="opacity-70" />
        <input
          type="text"
          name="username"
          onChange={handleChange}
          className="grow"
          required
          placeholder="Username"
        />
      </label>
      <label
        className={`input input-bordered rounded-md flex items-center gap-2 ${
          error?.status === 409 ? "input-error animate-shakeX" : ""
        }`}
      >
        <IoKeyOutline className="opacity-70" />
        <input
          type={checked ? "text" : "password"}
          className="grow"
          required
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
      <button
        type="submit"
        disabled={loading}
        className="btn rounded-md bg-blue-400 border-none text-white hover:bg-blue-300"
      >
        Login
      </button>
      <Link
        className="link link-info link-hover w-full text-center"
        to={"/register"}
      >
        {"Don't have an account? Register now!"}
      </Link>
    </form>
  );
}
