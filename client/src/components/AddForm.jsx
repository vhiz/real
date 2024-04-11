import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../axios";
import UploadImg from "./UploadImg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast from "react-hot-toast";

export default function AddForm() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [inputs, setInputs] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }
  const mutation = useMutation({
    mutationFn: (data) => {
      return apiRequest.post("/post", data);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Listing has been created");
      setTimeout(() => {
        navigate(`/list/${result.data.id}`);
      }, 3000);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      postData: {
        title: inputs.title,
        price: parseInt(inputs.price),
        address: inputs.address,
        city: inputs.city,
        bathroom: parseInt(inputs.bathroom),
        bedroom: parseInt(inputs.bedroom),
        latitude: inputs.latitude,
        longitude: inputs.longitude,
        type: inputs.type || "rent",
        property: inputs.property,
        images: images,
      },
      postDetail: {
        desc: value,
        utilities: inputs.utilities || "",
        pet: inputs.pet || "",
        income: inputs.income || "",
        size: parseInt(inputs.size),
        school: parseInt(inputs.school),
        bus: parseInt(inputs.bus),
        restaurant: parseInt(inputs.restaurant),
      },
    };

    mutation.mutate(data);
  }

  return (
    <form className="flex gap-10 flex-col xl:flex-row" onSubmit={handleSubmit}>
      <div className="flex flex-[2] w-full flex-wrap gap-5 items-center">
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full rounded-md"
            name="title"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="price"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="address"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full h-[20rem] mb-24 lg:mb-10">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-full"
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">City</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="city"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Bedroom Number</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="bedroom"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Bathroom Number</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="bathroom"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Latitude</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="latitude"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Longitude</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="longitude"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <select
            name="type"
            onChange={handleChange}
            className="select select-bordered rounded-md"
            required
          >
            <option disabled selected>
              Pick one
            </option>
            <option value={"buy"}>Buy</option>
            <option value={"rent"}>Rent</option>
          </select>
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Property</span>
          </div>
          <select
            name="property"
            onChange={handleChange}
            className="select select-bordered rounded-md"
            required
          >
            <option value={"house"}>House</option>
            <option value={"apartment"}>Apartment</option>
            <option value={"condo"}>Condo</option>
            <option value={"land"}>Land</option>
          </select>
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Utility Policy</span>
          </div>
          <select
            name="utilities"
            onChange={handleChange}
            className="select select-bordered rounded-md"
          >
            <option disabled selected>
              Pick one
            </option>
            <option>In charge of your tools</option>
            <option>Owner in charge of tools </option>
          </select>
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Pet Policy</span>
          </div>
          <select
            name="pet"
            onChange={handleChange}
            className="select select-bordered rounded-md"
          >
            <option disabled selected>
              Pick one
            </option>
            <option>Pet Allowed</option>
            <option>No Pet Allowed</option>
          </select>
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Income Policy</span>
          </div>
          <select
            name="income"
            onChange={handleChange}
            className="select select-bordered rounded-md"
          >
            <option disabled selected>
              Pick one
            </option>
            <option>First 3 months payment</option>
            <option>Monthly payment</option>
            <option>Yearly payment</option>
            <option>Open for discussion</option>
          </select>
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Total Size (sqt)</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="size"
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">School distance (miles)</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="school"
            onChange={handleChange}
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Bus distance (miles)</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="bus"
            onChange={handleChange}
          />
        </label>
        <label className="form-control w-full max-w-full xl:max-w-56">
          <div className="label">
            <span className="label-text">Restaurant distance (miles)</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered rounded-md w-full"
            name="restaurant"
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="btn w-full xl:w-56 h-20 rounded-md bg-green-500 text-white hover:bg-green-700"
        >
          Add
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center h-[80vh] flex-col gap-10">
        <div className="w-full flex items-center justify-center gap-4 flex-wrap">
          {images.map((img, i) => (
            <LazyLoadImage
              key={i}
              src={img}
              className="object-cover rounded-md w-20 h-20  md:w-40 md:h-40"
            />
          ))}
        </div>
        <UploadImg
          uwConfig={{
            cloudName: "dsemmhzl3",
            uploadPreset: "realEstate",
            maxImageFileSize: 2000000,
            folder: "posts",
          }}
          setState={setImages}
        />
        <span>2mb limit and max of 4 images</span>
      </div>
    </form>
  );
}
