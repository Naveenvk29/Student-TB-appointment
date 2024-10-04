import { useGetUserByIdQuery } from "../../redux/Api/userApi";
import { useParams } from "react-router-dom";
import CardDetatil from "../../components/CardDetatil";
import Loader from "../../components/Loader";

const TeacherbyID = () => {
  const { userId } = useParams();

  // Fetch user by ID
  const {
    data: teacher,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(userId);

  if (isLoading) return <Loader />;
  if (isError)
    return <p>Error: {error?.data?.message || "Failed to load teacher."}</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Details</h1>
      {teacher ? <CardDetatil data={teacher} /> : <p>Teacher not found.</p>}
    </div>
  );
};

export default TeacherbyID;
