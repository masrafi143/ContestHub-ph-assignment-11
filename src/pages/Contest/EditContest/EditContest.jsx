import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router";

const EditContest = () => {
  const { id } = useParams(); // contest ID from URL
  const navigate = useNavigate();

  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Fetch contest data by ID and pre-fill form
  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await fetch(`http://localhost:3000/contests/${id}`);
        if (!res.ok) throw new Error("Failed to fetch contest");
        const data = await res.json();

        if (data) {
          setValue("name", data.name);
          setValue("image", data.image);
          setValue("description", data.description);
          setValue("price", data.price);
          setValue("prize", data.prize);
          setValue("instruction", data.instruction);
          setValue("type", data.type);
          setDeadline(data.deadline ? new Date(data.deadline) : null);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load contest data");
      } finally {
        setLoading(false);
      }
    };

    fetchContest();
  }, [id, setValue]);

  // Update contest handler
  const onSubmit = async (data) => {
    if (!deadline) {
      alert("Deadline is required!");
      return;
    }

    const updatedData = {
      ...data,
      deadline: deadline.toISOString(),
    };

    try {
      setSubmitting(true);
      const res = await fetch(`http://localhost:3000/contests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (result.success) {
        alert(result.message); // Contest updated successfully!
        navigate("/my-contests"); // go back to My Contests page
      } else {
        alert(result.message); // No changes made or contest not found.
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating the contest!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading contest data...</p>;

  return (
    <div className="min-h-screen w-11/12 mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Contest</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg bg-base-200"
      >
        {/* Contest Name */}
        <div className="mb-5">
          <label>Contest Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            disabled={submitting}
          />
          {errors.name && <p className="text-red-500">Name required</p>}
        </div>

        {/* Image URL */}
        <div className="mb-5">
          <label>Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
            disabled={submitting}
          />
          {errors.image && <p className="text-red-500">Image required</p>}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label>Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
            disabled={submitting}
          ></textarea>
          {errors.description && <p className="text-red-500">Description required</p>}
        </div>

        {/* Entry Fee */}
        <div className="mb-5">
          <label>Entry Fee (Price)</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
            disabled={submitting}
          />
          {errors.price && <p className="text-red-500">Price required</p>}
        </div>

        {/* Prize Money */}
        <div className="mb-5">
          <label>Prize Money</label>
          <input
            type="number"
            {...register("prize", { required: true })}
            className="input input-bordered w-full"
            disabled={submitting}
          />
          {errors.prize && <p className="text-red-500">Prize required</p>}
        </div>

        {/* Task Instruction */}
        <div className="mb-5">
          <label>Task Instruction</label>
          <textarea
            {...register("instruction", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
            disabled={submitting}
          ></textarea>
          {errors.instruction && <p className="text-red-500">Instruction required</p>}
        </div>
 
        {/* Contest Type */}
        <div className="mb-5">
          <label>Contest Type</label>
          <select
            {...register("type", { required: true })}
            className="select select-bordered w-full"
            disabled={submitting}
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
          {errors.type && <p className="text-red-500">Type required</p>}
        </div>

        {/* Deadline */}
        <div className="mb-6">
          <label>Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={setDeadline}
            showTimeSelect
            dateFormat="Pp"
            className="input input-bordered w-full"
            disabled={submitting}
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-1/2"
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Contest"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContest;
