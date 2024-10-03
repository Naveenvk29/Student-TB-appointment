import React from "react";
import { useApproveStatusMutation } from "../../redux/Api/userApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
const ApproveStudents = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  const [approveStatus, { isLoading }] = useApproveStatusMutation(userId);

  const handleApprove = async () => {
    try {
      setStatus("pending");
      await approveStatus({
        variables: { id: userId, status },
      });
      setStatus("success");
      navigate("/dashboard");
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Approve Student</h2>

      <button onClick={handleApprove} disabled={isLoading}>
        Approve
      </button>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default ApproveStudents;
