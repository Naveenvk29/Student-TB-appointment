import { useGetAllUsersQuery } from "../../redux/Api/userApi";
import { Link } from "react-router-dom";

const Teacterslist = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.data?.message || "Failed to load teachers."}</p>;
  }

  const teachers = data?.filter((user) => user.role === "teacher");

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Teachers List</h1>
      {teachers?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher._id} className="border rounded p-4 shadow">
              <h3 className="text-2xl mb-3 font-semibold">
                {teacher.username}
              </h3>
              <p className="text-xl  font-medium">
                Email: <span className="text-lg">{teacher.email}</span>
              </p>
              <p className="text-xl  font-medium">
                Phone: <span className="text-lg">{teacher.phone}</span>
              </p>
              <Link
                to={`/admin/teacher/${teacher._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No teachers found.</p>
      )}
    </div>
  );
};

export default Teacterslist;
