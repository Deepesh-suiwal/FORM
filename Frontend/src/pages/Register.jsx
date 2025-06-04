import { useState } from "react";
// import instance from "./axiosConfig";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    dob: "",
    gender: "",
    aadhaar1: null,
    aadhaar2: null,
    parentName: "",
    parentPhone: "",
    localAddress: "",
    isSameAddress: false,
    permanentAddress: "",
    isStudent: false,
    isWorking: false,
    lastQualification: "",
    year: "",
    college: "",
    designation: "",
    company: "",
    course: "",
    howDidYouKnow: "",
    friendName: "",
  });
  const navivage = useNavigate();
  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "file") {
      setData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleRadioChange(name, value) {
    if (name === "isStudent") {
      setData((prev) => ({
        ...prev,
        isStudent: true,
        isWorking: false,
      }));
    } else if (name === "isWorking") {
      setData((prev) => ({
        ...prev,
        isStudent: false,
        isWorking: true,
      }));
    } else if (name === "howDidYouKnow") {
      setData((prev) => ({
        ...prev,
        howDidYouKnow: value,
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const frmData = new FormData();

    frmData.append("name", data.name);
    frmData.append("email", data.email);
    frmData.append("number", data.number);
    frmData.append("dob", data.dob);
    frmData.append("gender", data.gender);
    frmData.append("aadhaar1", data.aadhaar1);
    frmData.append("aadhaar2", data.aadhaar2);
    frmData.append("parentName", data.parentName);
    frmData.append("parentPhone", data.parentPhone);
    frmData.append("localAddress", data.localAddress);
    frmData.append("isSameAddress", data.isSameAddress);
    frmData.append("permanentAddress", data.permanentAddress);
    frmData.append("isStudent", data.isStudent);
    frmData.append("isWorking", data.isWorking);
    frmData.append("lastQualification", data.lastQualification);
    frmData.append("year", data.year);
    frmData.append("college", data.college);
    frmData.append("designation", data.designation);
    frmData.append("company", data.company);
    frmData.append("course", data.course);
    frmData.append("howDidYouKnow", data.howDidYouKnow);
    frmData.append("friendName", data.friendName);

    const res = await instance.post("/user/form/save", frmData);

    // setData({
    //   name: "",
    //   email: "",
    //   number: "",
    //   dob: "",
    //   gender: "",
    //   aadhaar1: null,
    //   aadhaar2: null,
    //   parentName: "",
    //   parentPhone: "",
    //   localAddress: "",
    //   isSameAddress: false,
    //   permanentAddress: "",
    //   isStudent: false,
    //   isWorking: false,
    //   lastQualification: "",
    //   year: "",
    //   college: "",
    //   designation: "",
    //   company: "",
    //   course: "",
    //   howDidYouKnow: "",
    //   friendName: "",
    // });
    console.log(res);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        encType="multipart/form-data"
      >
        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Full name"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="Number"
                name="number"
                value={data.number}
                onChange={handleChange}
                pattern="\d{10}"
                maxLength={10}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Phone"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={data.dob}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <div className="flex items-center gap-4 mt-1">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="inline-flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={data.gender === g}
                      onChange={handleChange}
                      required
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Aadhaar Front</label>
              <input
                type="file"
                name="aadhaar1"
                onChange={handleChange}
                className="mt-1"
                required
              />
              <label className="block text-sm font-medium mt-2">
                Aadhaar Back
              </label>
              <input
                type="file"
                name="aadhaar2"
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">
            Parent/Guardian Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Parent Name</label>
              <input
                type="text"
                name="parentName"
                value={data.parentName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Parent Phone</label>
              <input
                type="number"
                name="parentPhone"
                pattern="^\d{10}$"
                // min={10}
                maxLength={10}
                value={data.parentPhone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Residential Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Local Address</label>
              <input
                type="text"
                name="localAddress"
                value={data.localAddress}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isSameAddress"
                checked={data.isSameAddress}
                onChange={handleChange}
              />
              <label>Permanent address same as local address</label>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Permanent Address
              </label>
              <input
                type="text"
                name="permanentAddress"
                value={
                  data.isSameAddress ? data.localAddress : data.permanentAddress
                }
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={data.isSameAddress}
                required
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">
            Educational/Work Details
          </h3>
          <div className="flex items-center gap-6 mb-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="isStudent"
                checked={data.isStudent}
                onChange={() => handleRadioChange("isStudent")}
              />
              Student
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="isWorking"
                checked={data.isWorking}
                onChange={() => handleRadioChange("isWorking")}
              />
              Working Professional
            </label>
          </div>

          {data.isStudent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="lastQualification"
                value={data.lastQualification}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Last Qualification"
              />
              <input
                type="text"
                name="year"
                value={data.year}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Completion Year"
              />
              <input
                type="text"
                name="college"
                value={data.college}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="College/University"
              />
            </div>
          )}

          {data.isWorking && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="designation"
                value={data.designation}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Designation"
              />
              <input
                type="text"
                name="company"
                value={data.company}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Company"
              />
            </div>
          )}
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Course Details</h3>
          <div className="space-y-4">
            <select
              name="course"
              value={data.course}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a Course
              </option>
              {[
                "Advance java",
                "Android",
                "Computer Basics",
                "Core java",
                "Digital marketing",
                "Full stack Development",
                "Graphic design",
                "Node js",
                "PhotoShop",
                "PHP",
                "Python",
                "Other Course",
              ].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                How did you come to know about us?
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  "Google",
                  "LinkedIn",
                  "Instagram",
                  "College TPO",
                  "Friend",
                ].map((source) => (
                  <label
                    key={source}
                    className="inline-flex items-center gap-1"
                  >
                    <input
                      type="radio"
                      name="howDidYouKnow"
                      value={source}
                      checked={data.howDidYouKnow === source}
                      onChange={(e) =>
                        handleRadioChange("howDidYouKnow", e.target.value)
                      }
                      required
                    />
                    {source}
                  </label>
                ))}
              </div>

              {data.howDidYouKnow === "Friend" && (
                <input
                  type="text"
                  name="friendName"
                  value={data.friendName}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Friend's Name"
                  required
                />
              )}
            </div>
          </div>
        </section>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </div>
      </form>
      <p className="mt-2 text-sm">
        Already have an account{" "}
        <button
          type="button"
          className="text-blue-600 underline cursor-pointer"
          onClick={() => navivage("/")}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
