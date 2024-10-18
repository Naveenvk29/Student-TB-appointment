import { Link } from "react-router-dom";

const CardDetatil = ({ data }) => {
  return (
    <div className="rounded flex items-center justify-center">
      <div className="shadow-md p-10">
        {/* Username */}
        <h2 className="text-3xl capitalize tracking-wide mb-5 font-bold">
          {data?.username}
        </h2>

        {/* Email */}
        <p className="text-2xl mb-2 font-semibold">
          Email: <span className="text-xl font-medium"> {data?.email}</span>
        </p>

        {/* Phone */}
        <p className="text-2xl mb-2 font-semibold">
          Phone: <span className="text-xl font-medium">{data?.phone}</span>
        </p>

        {/* Address */}
        <p className="text-2xl mb-2 font-semibold">
          Address: <span className="text-xl font-medium">{data?.address}</span>
        </p>

        {/* Role */}
        <p className="text-2xl mb-2 font-semibold">
          Role: <span className="text-xl font-medium">{data?.role}</span>
        </p>

        {/* Status */}
        <p className="text-2xl mb-2 font-semibold">
          Status: <span className="text-xl font-medium">{data?.status}</span>
        </p>

        {/* Department */}
        {data?.department && (
          <p className="text-2xl mb-2 font-semibold">
            Department:{" "}
            <span className="text-xl font-medium">{data?.department}</span>
          </p>
        )}

        {/* Subject */}
        {data?.subject && (
          <p className="text-2xl mb-2 font-semibold">
            Subject:{" "}
            <span className="text-xl font-medium">{data?.subject}</span>
          </p>
        )}

        {(data?.role === "user" || data?.role === "admin") && (
          <div className="flex items-center justify-center mt-4">
            <Link
              to={`/admin/approve-students/${data._id}`}
              className="text-blue-500 hover:underline"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetatil;
