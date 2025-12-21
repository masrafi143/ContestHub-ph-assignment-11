import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../../provider/AuthProvider"; // update path if needed

const AddContest = () => {
  const { user, dark } = useContext(AuthContext); // dark mode flag
  const userEmail = user?.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!deadline) {
      alert("Deadline required!");
      return;
    }
    if (!userEmail) {
      alert("You must be logged in to create a contest.");
      return;
    }

    const finalData = {
      ...data,
      deadline: deadline instanceof Date ? deadline.toISOString() : deadline,
      createdAt: new Date().toISOString(),
      email: userEmail,
      participantsCount: 0,
      status: "pending",
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/contests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
      const result = await res.json();

      if (result.insertedId) {
        alert("Contest Created Successfully!");
        reset();
        setDeadline(null);
      } else {
        alert("Failed to create contest!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-11/12 mx-auto py-10 transition-colors ${
        dark ? "bg-[#0b132b] text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl md:text-5xl font-bold text-center mb-8 ${
          dark ? "text-cyan-400" : "text-primary"
        }`}
      >
        Create New Contest
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-3xl mx-auto p-6 rounded-xl shadow-lg border transition-colors ${
          dark
            ? "bg-[#111c44] border-[#0b132b]"
            : "bg-base-200 border-base-300"
        }`}
      >
        {/* Contest Name */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Contest Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className={`input input-bordered w-full transition-colors ${
              dark ? "bg-[#0b132b] border-[#111c44] text-gray-100" : ""
            }`}
            placeholder="Enter contest name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        {/* Image URL */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className={`input input-bordered w-full transition-colors ${
              dark ? "bg-[#0b132b] border-[#111c44] text-gray-100" : ""
            }`}
            placeholder="Enter image URL"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            className={`textarea textarea-bordered w-full transition-colors ${
              dark ? "bg-[#0b132b] border-[#111c44] text-gray-100" : ""
            }`}
            placeholder="Write contest description"
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Entry Fee */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Entry Fee (Price)</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className={`input input-bordered w-full transition-colors ${
              dark ? "bg-[#0b132b] border-[#111c44] text-gray-100" : ""
            }`}
            placeholder="Enter entry fee (0 for free)"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">Price is required</p>
          )}
        </div>

        {/* Prize Money */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Prize Money</label>
          <input
            type="number"
            {...register("prize", { required: true })}
            className={`input input-bordered w-full transition-colors ${
              dark ? "bg-[#0b132b] border-[#111c44] text-gray-100" : ""
            }`}
            placeholder="Prize amount (e.g., 5000)"
          />
          {errors.prize && (
            <p className="text-red-500 text-sm">Prize money required</p>
          )}
        </div>

        {/* Task Instruction */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Task Instruction</label>
          <textarea
            {...register("instruction", { required: true })}
            className={`textarea textarea-bordered w-full transition-colors ${
              dark ? "bg-[#0b132b] border-[#111c44] text-gray-100" : ""
            }`}
            placeholder="What should participants do?"
            rows={4}
          ></textarea>
          {errors.instruction && (
            <p className="text-red-500 text-sm">Instruction is required</p>
          )}
        </div>

        {/* Contest Type */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Contest Type</label>
          <select
            {...register("type", { required: true })}
            className={`select select-bordered w-full transition-colors ${
              dark ? "bg-[#0b132b] border-[#111c44] text-gray-100" : ""
            }`}
          >
            <option value="">Select contest type</option>
            <option value="Programming Contest">Programming Contest</option>
            <option value="Quiz Competition">Quiz Competition</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Gaming Tournament">Gaming Tournament</option>
            <option value="Robotics Contest">Robotics Contest</option>
            <option value="Math Olympiad">Math Olympiad</option>
            <option value="Project Showcase">Project Showcase</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">Contest type required</p>
          )}
        </div>

        {/* Deadline */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Deadline</label>
          <div className="relative">
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              minDate={new Date()}
              dateFormat="Pp"
              placeholderText="Select deadline"
              className={`input input-bordered w-full pl-12 py-3 rounded-xl text-base shadow-sm transition-colors ${
                dark ? "bg-[#0b132b] border-[#111c44] text-gray-100" : ""
              }`}
            />
            <span
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                dark ? "text-gray-300" : "text-gray-500"
              }`}
            >
              📅
            </span>
          </div>
          {!deadline && (
            <p className="text-red-500 text-sm mt-1">Deadline is required</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            disabled={loading}
            className={`btn w-full md:w-1/2 transition-colors ${
              dark ? "btn-primary bg-[#0b132b] text-gray-100 hover:bg-[#111c44]" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Contest"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
