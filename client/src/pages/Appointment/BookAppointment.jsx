import { useGetAllUsersQuery } from "../../redux/Api/userApi";
import { useCreateAppointmentMutation } from "../../redux/Api/AppointmentApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BookAppointment = () => {
  const { data: users } = useGetAllUsersQuery();
  const teachers = users?.filter((user) => user.role === "teacher");
  const { userInfo } = useSelector((state) => state.auth);

  const [teacherId, setTeacherId] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherId || !appointmentTime || !purpose) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await createAppointment({
        teacherId,
        appointmentTime,
        purpose,
      }).unwrap();

      toast.success("Appointment booked successfully!");
      navigate("/appointments");
    } catch (error) {
      toast.error(error.data?.message || "Failed to book appointment.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="p-8 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="teacher"
              className="block text-lg mb-2 font-medium text-gray-700"
            >
              Choose a Teacher:
            </label>
            <select
              id="teacher"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full p-2 border border-black rounded-xl "
            >
              <option value="">Select Teacher</option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="appointmentTime"
              className="block text-lg mb-2 font-medium text-gray-700"
            >
              Appointment Time:
            </label>
            <input
              id="appointmentTime"
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full p-2 border border-black rounded-xl "
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="purpose"
              className="block text-lg mb-2 font-medium text-gray-700"
            >
              Purpose:
            </label>
            <input
              id="purpose"
              type="text"
              placeholder="Enter Purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2 border border-black rounded-xl "
            />
          </div>

          {userInfo ? (
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {isLoading ? "Booking..." : "Book Appointment"}
            </button>
          ) : (
            <p className="text-lg">
              Please{" "}
              <Link className="text-lg font-medium text-blue-500 hover:underline">
                login
              </Link>{" "}
              to book an appointment.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
