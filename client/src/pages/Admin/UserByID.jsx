import { useGetUserByIdQuery } from "../../redux/Api/userApi";
import { Link, useParams } from "react-router-dom";
import CardDetatil from "../../components/CardDetatil";
import Loader from "../../components/Loader";

const UserByID = () => {
  const { userId } = useParams();

  // Fetch user by ID
  const { data: user, isLoading, isError, error } = useGetUserByIdQuery(userId);
  if (isLoading) return <Loader />;
  if (isError)
    return <p>Error: {error?.data?.message || "Failed to load user."}</p>;
  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">user Details</h1>
      {user ? <CardDetatil data={user} /> : <p>User not found.</p>}
      <Link to={`/admin/users`}>
        <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to users
        </button>
      </Link>
    </div>
  );
};

export default UserByID;
