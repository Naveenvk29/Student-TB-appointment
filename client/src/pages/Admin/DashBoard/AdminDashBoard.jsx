import AsideNav from "./Side/AsideNav";
import Hero from "./Hero/Hero";

const AdminDashBoard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <AsideNav />
      <div className="w-full md:ml-[20vw]">
        {" "}
        {/* This adds space for the fixed AsideNav */}
        <Hero />
      </div>
    </div>
  );
};

export default AdminDashBoard;
