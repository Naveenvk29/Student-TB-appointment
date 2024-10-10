import { useGetMyAppointmentsQuery } from "../../redux/Api/userApi";
import AppointmentCard from "../../components/AppointmentCard";

const Appointments = () => {
  const { data: appointments, isLoading, error } = useGetMyAppointmentsQuery();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        Error fetching appointments
      </div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return <div className="text-center">No appointments found.</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
        My Appointments
      </h2>
      <div className="mt-4 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

// AppointmentCard component to fetch the teacher's data by ID for each appointment
// const AppointmentCard = ({ appointment }) => {
//   const { data: teacher, isLoading: isTeacherLoading } = useGetUserByIdQuery(
//     appointment.teacher
//   );

//   if (isTeacherLoading) {
//     return <div>Loading teacher info...</div>;
//   }

//   return (
//     <div className="p-6 shadow-md">
//       <p className="font-medium">
//         <strong>Teacher Name:</strong> {teacher ? teacher.username : "Unknown"}
//       </p>
//       <p className="font-medium">
//         <strong>Time:</strong> {appointment.appointmentTime}
//       </p>
//       <p>
//         <strong>Purpose:</strong> {appointment.purpose}
//       </p>
//       <p>
//         <strong>Status:</strong> {appointment.status}
//       </p>
//     </div>
//   );
// };

export default Appointments;
