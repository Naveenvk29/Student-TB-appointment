import { useUpdateAppointmentMutation } from "../../redux/Api/AppointmentApi";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdatedAppointment = () => {
  const { appointmentId } = useParams();
  const [updateAppointment, { isLoading }] = useUpdateAppointmentMutation();
  const navigate = useNavigate();

  const [newStatus, setNewStatus] = useState("approved"); // default status or you can fetch the current status

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateAppointment({ appointmentId, newStatus }).unwrap();
      toast.success("Appointment status updated successfully!");
      navigate(`/admin/appointments`);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update appointment.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Appointment</h1>
      <form onSubmit={handleUpdate}>
        <label className="block mb-2">Change Status:</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="canceled">Canceled</option>
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          {isLoading ? "Updating..." : "Update Appointment"}
        </button>
      </form>
    </div>
  );
};

export default UpdatedAppointment;
