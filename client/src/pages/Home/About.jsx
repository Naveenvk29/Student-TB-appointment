const About = () => {
  return (
    <div
      className="h-[100%] relative flex flex-col items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: `url("https://cdn.elearningindustry.com/wp-content/uploads/2022/11/shutterstock_1798672534.jpg")`,
      }}
    >
      <div className="absolute w-full h-full z-40 bg-black opacity-80"></div>
      <div className="z-50 w-[70%] mt-52  ">
        <div className=" text-white mb-10  ">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">About Us</h1>
          <p className="text-lg font-medium tracking-wide leading-loose  mb-4">
            Welcome to the <strong>Student Teacher Appointment System</strong> –
            <br />a platform dedicated to simplifying the way students connect
            with teachers for scheduling appointments. Our mission is to bridge
            the gap between students and teachers, making communication seamless
            and effective.
          </p>
        </div>
      </div>
      <div className="z-50 w-[70%] text-white my-40">
        <h2 className="text-2xl font-semibold text-blue-500 mt-6">
          Our Mission
        </h2>
        <p className="text-lg mb-4">
          We aim to provide an efficient, easy-to-use system that allows
          students to schedule appointments with teachers effortlessly, helping
          to foster better communication and time management for everyone
          involved.
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mt-6">
          How It Works
        </h2>
        <p className="text-lg mb-4">
          Our system is designed to be user-friendly for both students and
          teachers. After registering, students can browse teacher availability,
          book appointments, and receive reminders. Teachers can manage their
          schedules with ease and ensure that appointments are organized.
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mt-6">
          Testimonials
        </h2>
        <p className="text-lg italic mb-4">
          "The appointment system has made it so much easier to schedule time
          with my teachers!" - Student A
        </p>
        <p className="text-lg italic mb-4">
          "I love how organized my schedule is now, thanks to this system." -
          Teacher B
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mt-6">
          Contact Us
        </h2>
        <p className="text-lg mb-4">
          Have questions? Feel free to{" "}
          <a href="/contact" className="text-blue-600 underline">
            get in touch with us
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
