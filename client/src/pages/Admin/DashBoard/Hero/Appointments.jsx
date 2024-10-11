const Appointments = ({ appointments }) => {
  const approvedCount = appointments?.filter(
    (appointment) => appointment.status === "approved"
  ).length;
  const pendingCount = appointments?.filter(
    (appointment) => appointment.status === "pending"
  ).length;

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h2>

      {appointments && appointments.length > 0 ? (
        <div className="space-y-4">
          <div className="flex gap-5 mb-6">
            <div className="p-4 bg-green-200 rounded flex flex-col justify-center items-center shadow">
              <p className="text-lg font-semibold">Approved:</p>
              <p className="text-2xl font-bold text-green-600">
                {approvedCount}
              </p>
            </div>
            <div className="p-4 bg-yellow-200 rounded flex flex-col justify-center items-center shadow">
              <p className="text-lg font-semibold">Pending:</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pendingCount}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No appointments found.</p>
      )}
    </div>
  );
};

export default Appointments;
