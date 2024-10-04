import { Link } from "react-router-dom";
const CardDetatil = ({ data }) => {
  return (
    <div className="rounded  flex items-center justify-center ">
      <div className="shadow-md p-10">
        <h2 className="text-3xl capitalize tracking-wide mb-5 font-bold">
          {data?.username}
        </h2>
        <p className="text-2xl mb-2 font-semibold">
          Email: <span className="text-xl font-medium"> {data?.email}</span>
        </p>
        <p className="text-2xl mb-2 font-semibold">
          Phone: <span className="text-xl font-medium">{data?.phone}</span>
        </p>
        <p className="text-2xl mb-2 font-semibold">
          Address: <span className="text-xl font-medium">{data?.address}</span>
        </p>
        <p className="text-2xl mb-2 font-semibold">
          Role: <span className="text-xl font-medium">{data?.role}</span>
        </p>
        <p className="text-2xl mb-2 font-semibold">
          Status: <span className="text-xl font-medium">{data?.status}</span>
        </p>
        {data?.role == "user" && (
          <div className="flex items-center justify-center">
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
