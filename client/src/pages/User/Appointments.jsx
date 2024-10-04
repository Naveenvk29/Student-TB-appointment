import { useGetMyAppointmentsQuery } from "../../redux/Api/AppointmentApi"; // Assuming you're using RTK Query
import { useSelector } from "react-redux";
const Appointments = () => {
  const { userId } = useSelector((state) => state.auth.userInfo);

  const {
    data: appointments,
    isLoading,
    error,
  } = useGetMyAppointmentsQuery({
    userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching appointments</div>;

  return (
    <div>
      <h2>My Appointments</h2>
      {appointments.map((appointment) => (
        <div key={appointment._id}>
          <p>Teacher: {appointment.teacherId}</p>
          <p>Time: {appointment.appointmentTime}</p>
          <p>Purpose: {appointment.purpose}</p>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
