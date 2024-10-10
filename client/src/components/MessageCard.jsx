import { useGetUserByIdQuery } from "../redux/Api/userApi";
import { useDeleteMessageMutation } from "../redux/Api/messageApi";

const MessageCard = ({ message }) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(message.student);
  console.log(message);

  const [deleteMessage] = useDeleteMessageMutation();
  const handleDeleteMessage = async () => {
    try {
      await deleteMessage({ id: message._id });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="border w-[20vw] p-4 rounded shadow-md my-2 bg-gray-100">
      {isLoading ? (
        <p>Loading user data...</p>
      ) : isError ? (
        <p className="text-red-600">
          Error: {error?.data?.message || "Failed to load user data"}
        </p>
      ) : (
        <div className="">
          <h3 className="text-lg font-bold">
            Message from {user?.username || "Unknown Teacher"}
          </h3>
          <p className="text-sm text-gray-700">{message.message}</p>
          <button
            className="text-blue-600 hover:text-blue-700 ml-auto"
            onClick={handleDeleteMessage}
          >
            Delete Message
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
