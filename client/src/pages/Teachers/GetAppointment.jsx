import { Link } from "react-router-dom";
import { useGetAppointmentsQuery } from "../../redux/Api/AppointmentApi";

const GetAppointment = () => {
  const { data, isLoading, isError, error } = useGetAppointmentsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>Error: {error?.data?.message || "Failed to load appointments."}</p>
    );

  if (!data || data.length === 0) {
    return <p>No appointments found.</p>;
  }

  // Format appointment date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Appointments List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((appointment) => (
          <div key={appointment._id} className="border rounded p-4 shadow">
            <h3 className="text-2xl mb-3 font-semibold">
              {appointment.studentName} - {appointment.teacherName}
            </h3>
            <p className="text-xl font-medium">
              Date: {formatDate(appointment.appointmentTime)}
            </p>
            <p className="text-lg">Purpose: {appointment.purpose}</p>
            <p className="text-lg">Status: {appointment.status}</p>
            {appointment.feedback && (
              <p className="text-lg">Feedback: {appointment.feedback}</p>
            )}

            <Link to={`/teacher/update-appointment/${appointment._id}`}>
              <button className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                Update
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAppointment;
