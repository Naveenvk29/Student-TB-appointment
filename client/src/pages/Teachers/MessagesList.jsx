import MessageCard from "../../components/MessageCard";
import { useGetAllMessagesQuery } from "../../redux/Api/messageApi";
import { useNavigate } from "react-router-dom";

const MessagesList = () => {
  const { data, isLoading, isError, error } = useGetAllMessagesQuery();

  const navigate = useNavigate();
  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>Error: {error?.data?.message || "Failed to load messages."}</p>;
  return (
    <div className="max-w-screen-lg mx-auto   mt-10 ">
      <button
        className="my-5 text-xl font-medium hover:text-blue-500 hover:underline"
        onClick={() => navigate(-1)}
      >
        back
      </button>

      <h1 className="text-2xl font-bold text-gray-800">Messages</h1>

      <div className="flex gap-10 my-5">
        {data.map((message) => (
          <MessageCard key={message._id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
