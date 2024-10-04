// import { useState } from "react";
import { useApproveStatusMutation } from "../../redux/Api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ApproveStudents = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [approveStatus, { isLoading }] = useApproveStatusMutation();

  const handleApprove = async () => {
    try {
      await approveStatus({ id, status: "approved" }).unwrap();
      toast.success("Student approved successfully!");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.data?.message || "Failed to approve student.");
    }
  };

  const handleReject = async () => {
    try {
      await approveStatus({ id, status: "rejected" }).unwrap();
      toast.success("Student rejected successfully!");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.data?.message || "Failed to reject student.");
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Approve Student</h1>
      <div>
        <p>Approve the student's status?</p>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleApprove}
          disabled={isLoading}
        >
          {isLoading ? "Approving..." : "Approve"}
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          onClick={handleReject}
          disabled={isLoading}
        >
          {isLoading ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default ApproveStudents;
