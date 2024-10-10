import { Link } from "react-router-dom";
import { useSendMessageMutation } from "../../redux/Api/messageApi";
import { useGetAllUsersQuery } from "../../redux/Api/userApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Message = () => {
  const [message, setMessage] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const { data: users } = useGetAllUsersQuery();
  const teachers = users?.filter((user) => user.role === "teacher");
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherId || !message) {
      toast.error("Please select a teacher and write a message.");
      return;
    }

    try {
      await sendMessage({ teacherId, message }).unwrap();
      setMessage("");
      toast.success("Message sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="p-8 shadow-md rounded mt-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="font-medium mb-2">Select Teacher:</label>
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Select Teacher</option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.username}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium mb-2">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              rows="4"
            />
          </div>

          {userInfo?.status === "pending" && (
            <p className="text-sm text-red-500">
              You must be approved by a teacher before sending a message.
            </p>
          )}

          {userInfo ? (
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          ) : (
            <p className="text-lg">
              Please{" "}
              <Link
                to="/login"
                className="text-lg font-medium text-blue-500 hover:underline"
              >
                login
              </Link>{" "}
              to send your message.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Message;
