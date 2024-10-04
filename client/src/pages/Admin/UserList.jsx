import { useGetAllUsersQuery } from "../../redux/Api/userApi";
import { Link } from "react-router-dom";

const UserList = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.data?.message || "Failed to load data."}</p>;
  }
  const users = data?.filter((user) => user.role === "user");

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      {users?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div key={user._id} className="border rounded p-4 shadow">
              <h3 className="text-2xl mb-3 font-semibold">{user.username}</h3>
              <p className="text-xl  font-medium">
                Email: <span className="text-lg">{user.email}</span>
              </p>
              <p className="text-xl  font-medium">
                Phone: <span className="text-lg">{user.phone}</span>
              </p>
              <Link
                to={`/admin/user/${user._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default UserList;
