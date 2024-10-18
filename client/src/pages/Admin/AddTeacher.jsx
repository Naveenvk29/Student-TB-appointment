import { useAddTeacherMutation } from "../../redux/Api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import { useState } from "react";

const departmentSubjects = {
  Math: ["Mathematics"],
  Science: ["Science", "Health Science"],
  English: ["English"],
  "Social Studies": ["Social Studies"],
  "Physical Education": ["Physical Education"],
  Music: ["Music"],
  Arts: ["Arts", "Digital Art"],
  "Home Economics": ["Home Economics"],
  "Computer Science": [
    "Computer Science",
    "Web Development",
    "AL/ML",
    "Data Science",
    "Cybersecurity",
  ],
  "Business Administration": [
    "Business Administration",
    "Economics",
    "Digital Marketing",
  ],
};

const AddTeacher = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");

  const navigate = useNavigate();
  const [addTeacher, { isLoading }] = useAddTeacherMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !username ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !department ||
      !subject
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await addTeacher({
        username,
        email,
        password,
        phone,
        address,
        department,
        subject,
      }).unwrap();

      toast.success("Teacher added successfully!");
      navigate("/admin/teachers");
    } catch (error) {
      toast.error(error.data?.message || "Failed to add teacher.");
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="border rounded px-4 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Phone</label>
          <input
            type="text"
            placeholder="Phone"
            className="border rounded px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Address</label>
          <input
            type="text"
            placeholder="Address"
            className="border rounded px-4 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Department */}
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Department</label>
          <select
            className="border rounded px-4 py-2"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setSubject(""); // Reset subject when department changes
            }}
          >
            <option value="">Select Department</option>
            {Object.keys(departmentSubjects).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Subject</label>
          <select
            className="border rounded px-4 py-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={!department} // Disable if no department is selected
          >
            <option value="">Select Subject</option>
            {department &&
              departmentSubjects[department].map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Teacher"}
        </button>
        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default AddTeacher;
