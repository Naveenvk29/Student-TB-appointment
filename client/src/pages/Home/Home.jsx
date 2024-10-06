const Home = () => {
  return (
    <div
      className="h-screen relative flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://www.skillstork.org/blog/wp-content/uploads/2022/11/modern-education-Skillstork.jpg")`,
      }}
    >
      <div className="absolute w-full h-full z-40 bg-black opacity-70"></div>
      <div className="z-50 text-white">
        <div className="w-[80%]">
          <h1 className="text-5xl font-black ">
            Welcome to the Student Teacher Appointment System
          </h1>
          <p className="text-lg font-medium mt-10">
            Discover the joy of learning
          </p>
          <div className="mt-8">
            <button className="px-4 py-2 text-white font-medium rounded-lg bg-blue-500 hover:bg-blue-600">
              Learn More
            </button>
            <a
              href="/register"
              className="px-4 py-2 text-white font-medium rounded-lg bg-blue-500 hover:bg-blue-600 ml-4"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
