import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApplyCreator = () => {
  const { register, handleSubmit } = useForm();
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleCreatorApplication = (data) => {
    data.status = "pending";
    data.appliedAt = new Date();

    axiosSecure.post("/creators", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Application submitted successfully. Review may take up to 14 days.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-4xl text-primary text-center mt-5">
        Apply as Contest Creator
      </h2>

      <form
        onSubmit={handleSubmit(handleCreatorApplication)}
        className="mt-12 p-4 text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Creator Basic Info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Basic Information</h4>

            <label className="label">Full Name</label>
            <input
              {...register("name")}
              defaultValue={dbUser?.name}
              className="input w-full"
            />

            <label className="label">Email</label>
            <input
              {...register("email")}
              defaultValue={dbUser?.email}
              className="input w-full"
            />

            <label className="label">Phone Number</label>
            <input {...register("phone")} className="input w-full" />

            <label className="label">Address</label>
            <input {...register("address")} className="input w-full" />
          </fieldset>

          {/* Professional Details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Professional Details</h4>

            <label className="label">Creator Type</label>
            <select {...register("creatorType")} className="select w-full">
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>

            <label className="label">Organization Name (if any)</label>
            <input {...register("organization")} className="input w-full" />

            <label className="label">Years of Experience</label>
            <input
              type="number"
              {...register("experience")}
              className="input w-full"
            />

            <label className="label">Primary Contest Category</label>
            <select {...register("category")} className="select w-full">
              <option>Programming</option>
              <option>Design</option>
              <option>Photography</option>
              <option>Writing</option>
              <option>Gaming</option>
              <option>Quiz</option>
            </select>
          </fieldset>

          {/* Contest Capability */}
          <fieldset className="fieldset md:col-span-2">
            <h4 className="text-2xl font-semibold">Contest Capability</h4>

            <label className="label">Portfolio / Previous Contest Link</label>
            <input {...register("portfolio")} className="input w-full" />

            <label className="label">
              Why do you want to be a Contest Creator?
            </label>
            <textarea {...register("motivation")} className="textarea w-full" />

            <label className="label">Estimated Monthly Contests</label>
            <input
              type="number"
              {...register("monthlyContests")}
              className="input w-full"
            />

            <label className="label">Prize Budget Range</label>
            <input {...register("budgetRange")} className="input w-full" />

            <label className="label">Can you manage judging?</label>
            <select {...register("canJudge")} className="select w-full">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </fieldset>

          {/* Verification */}
          <fieldset className="fieldset md:col-span-2">
            <h4 className="text-2xl font-semibold">Verification</h4>

            <label className="label">National ID (NID)</label>
            <input {...register("nid")} className="input w-full" />

            <label className="cursor-pointer flex gap-2 items-center mt-4">
              <input
                type="checkbox"
                {...register("agreement", { required: true })}
              />
              <span>I agree to ContestHub terms & policies</span>
            </label>
          </fieldset>
        </div>

        <input
          type="submit"
          className="btn btn-primary mt-8 text-white"
          value="Apply as Contest Creator"
        />
      </form>
    </div>
  );
};

export default ApplyCreator;
