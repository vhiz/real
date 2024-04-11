import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { apiRequest } from "../axios";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState("male");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
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
      await apiRequest.post("/auth/register", {
        ...inputs,
        gender,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast(error.response.data.error, {
        icon: <CiUser className="text-2xl" />,
        className: "flex gap-2 capitalize",
      });
      setError(error.response.status);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <label
        className={`input input-bordered rounded-md flex items-center gap-2 ${
          error === 409 ? "input-error animate-shakeX" : ""
        }`}
      >
        <CiUser className="opacity-70" />
        <input
          type="text"
          className="grow"
          required
          minLength={5}
          placeholder="Username"
          onChange={handleChange}
          name="username"
        />
      </label>
      <label
        className={`input input-bordered rounded-md flex items-center gap-2 ${
          error === 405 ? "input-error animate-shakeX" : ""
        }`}
      >
        <AiOutlineMail className="opacity-70" />
        <input
          type="email"
          className="grow"
          minLength={5}
          required
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
      </label>
      <label className="input input-bordered rounded-md flex items-center gap-2">
        <IoKeyOutline className="opacity-70" />
        <input
          type={checked ? "text" : "password"}
          className="grow"
          minLength={5}
          required
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={onChangeCheckbox} />
          <FaRegEye className="swap-on" />
          <FaRegEyeSlash className="swap-off" />
        </label>
      </label>
      <div className="flex gap-x-4">
        <label
          htmlFor="male"
          className={`${
            gender === "male" ? "bg-base-300" : "bg-base-100"
          } rounded-md p-2 cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={() => setGender("male")}
        >
          <LazyLoadImage
            alt=""
            effect="blur"
            className="w-20 h-20"
            src={"https://avatar.iran.liara.run/public/1.png"}
          />
        </label>
        <input
          type="radio"
          // name="gender"
          className="hidden radio"
          value={"male"}
          id="male"
          checked={gender === "male"}
        />
        <label
          htmlFor="female"
          className={`${
            gender === "female" ? "bg-base-300" : "bg-base-100"
          } rounded-md p-2 cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={() => setGender("female")}
        >
          <LazyLoadImage
            alt=""
            effect="blur"
            className="w-20 h-20"
            src={"https://avatar.iran.liara.run/public/80.png"}
          />
        </label>
        <input
          type="radio"
          // name="gender"
          className="hidden"
          value={"female"}
          id="female"
          checked={gender === "female"}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn rounded-md bg-blue-400 border-none text-white hover:bg-blue-300"
      >
        Register
      </button>
      <Link
        className="link link-info link-hover w-full text-center"
        to={"/login"}
      >
        {"Have an account?"}
      </Link>
    </form>
  );
}
