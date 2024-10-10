import { useGetAppointmentsQuery } from "../../redux/Api/AppointmentApi";

import AppointmentCard from "../../components/AppointmentCard";
const GetAppointment = () => {
  const {
    data: appointments,
    isLoading,
    isError,
    error,
  } = useGetAppointmentsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>Error: {error?.data?.message || "Failed to load appointments."}</p>
    );

  if (!appointments || appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Appointments List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

// AppointmentCard component to handle fetching student's name by id

export default GetAppointment;
