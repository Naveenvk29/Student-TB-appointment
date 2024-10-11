const Message = ({ messages }) => {
  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>

      {messages && messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow-md bg-gray-100 flex flex-col"
            >
              <p className="text-lg font-semibold">From: {message._id}</p>
              <p className="text-gray-700">Message: {message.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No messages found.</p>
      )}
    </div>
  );
};

export default Message;
