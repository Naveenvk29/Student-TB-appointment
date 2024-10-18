import { useGetAllUsersQuery } from "../../../../redux/Api/userApi";
import { useGetAppointmentsQuery } from "../../../../redux/Api/AppointmentApi";
import { useGetAllMessagesQuery } from "../../../../redux/Api/messageApi";
import RealTime from "./RealTime";
import Appointments from "./Appointments";
import Message from "./Message";
const Hero = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: appointments } = useGetAppointmentsQuery();
  const { data: messages } = useGetAllMessagesQuery();
  return (
    <div className="max-w-screen-lg mx-auto">
      <RealTime users={users} />
      <Appointments appointments={appointments} />
      <Message messages={messages} />
    </div>
  );
};

export default Hero;
