import { useGetMyAppointmentsQuery } from "../../redux/Api/userApi";
// import datafns from "date-fns";

const Appointments = () => {
  const { data: appointments, isLoading, error } = useGetMyAppointmentsQuery();

  if (!appointments) return null;

  // const formatDate = (date) => datafns.format(new Date(date), "MMMM dd, yyyy");

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
        My Appointments
      </h2>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center">
          Error fetching appointments
        </div>
      ) : (
        <div className="mt-4 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="p-6 shadow-md lg:w-[30%] ">
              <p className="font-medium">
                <strong>Time:</strong> {appointment.appointmentTime}
              </p>
              <p>
                <strong>Purpose:</strong> {appointment.purpose}
              </p>
              <p>
                <strong>Status:</strong> {appointment.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
