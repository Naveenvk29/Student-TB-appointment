import {
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} from "../../redux/Api/AppointmentApi";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdatedAppointment = () => {
  const { id } = useParams();
  const [updateAppointment, { isLoading }] = useUpdateAppointmentMutation();
  const [deleteAppointment, { isLoading: deleteLoading }] =
    useDeleteAppointmentMutation();
  const navigate = useNavigate();

  // Local state for tracking new appointment status, defaulting to "pending"
  const [newStatus, setNewStatus] = useState("pending");

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Basic validation to ensure status is selected
    if (!newStatus) {
      toast.error("Please select a status to update.");
      return;
    }

    try {
      await updateAppointment({ id, status: newStatus }).unwrap();
      toast.success("Appointment status updated successfully!");
      navigate(`/teacher/get-appointment`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update appointment.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment({ id }).unwrap();
      toast.success("Appointment deleted successfully!");
      navigate(`/teacher/get-appointment`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete appointment.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Appointment</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-5">
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
        <button
          type="button"
          onClick={handleDelete}
          disabled={isLoading || deleteLoading}
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
        >
          {isLoading || deleteLoading ? "Deleting..." : "Delete Appointment"}
        </button>
      </form>
    </div>
  );
};

export default UpdatedAppointment;
