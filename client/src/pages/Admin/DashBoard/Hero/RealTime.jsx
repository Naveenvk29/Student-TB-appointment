const RealTime = ({ users }) => {
  const teacherCount =
    users?.filter((user) => user.role === "teacher").length || 0;
  const studentCount =
    users?.filter((user) => user.role === "user").length || 0;

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Real-Time User Stats
      </h1>
      <div className="flex flex-col sm:flex-row justify-around items-center">
        <div className="bg-blue-500 text-white rounded-lg p-4 m-2 w-full sm:w-auto text-center shadow-md">
          <h2 className="text-xl font-semibold">Total Live Users</h2>
          <p className="text-4xl font-bold">{users?.length || 0}</p>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-4 m-2 w-full sm:w-auto text-center shadow-md">
          <h2 className="text-xl font-semibold">Teachers</h2>
          <p className="text-4xl font-bold">{teacherCount}</p>
        </div>

        <div className="bg-yellow-500 text-white rounded-lg p-4 m-2 w-full sm:w-auto text-center shadow-md">
          <h2 className="text-xl font-semibold">Students</h2>
          <p className="text-4xl font-bold">{studentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default RealTime;
