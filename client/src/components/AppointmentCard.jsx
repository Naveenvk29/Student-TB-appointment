import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/Api/userApi";
import { useSelector } from "react-redux";
const AppointmentCard = ({ appointment }) => {
  const { data: student, isLoading: isStudentLoading } = useGetUserByIdQuery(
    appointment.student
  );
  const { data: teacher, isLoading: isTeacherLoading } = useGetUserByIdQuery(
    appointment.teacher
  );

  const { userInfo } = useSelector((state) => state.auth);

  if (isStudentLoading) return <p>Loading student information...</p>;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="border rounded p-4 shadow">
      {userInfo.role === "user" && (
        <>
          <h3 className="text-2xl mb-3 font-semibold">
            Teacher name: {teacher ? teacher.username : "Unknown"}
          </h3>
          <p className="text-xl font-medium">
            Date: {formatDate(appointment.appointmentTime)}
          </p>
          <p className="text-lg">Purpose: {appointment.purpose}</p>
          <p className="text-lg">Status: {appointment.status}</p>
          {appointment.feedback && (
            <p className="text-lg">Feedback: {appointment.feedback}</p>
          )}
        </>
      )}

      {userInfo.role == "teacher" ||
        (userInfo.role === "admin" && (
          <>
            <h3 className="text-2xl mb-3 font-semibold">
              Student Name: {student ? student.username : "Unknown"}
            </h3>
            <p className="text-xl font-medium">
              Date: {formatDate(appointment.appointmentTime)}
            </p>
            <p className="text-lg">Purpose: {appointment.purpose}</p>
            <p className="text-lg">Status: {appointment.status}</p>
            {appointment.feedback && (
              <p className="text-lg">Feedback: {appointment.feedback}</p>
            )}
            <br />
            <Link to={`/teacher/update-appointment/${appointment._id}`}>
              <button className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                Update
              </button>
            </Link>
          </>
        ))}
    </div>
  );
};

export default AppointmentCard;
