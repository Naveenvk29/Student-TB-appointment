import { useAddTeacherMutation } from "../../redux/Api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import { useState } from "react";
const AddTeacher = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addTeacher, { loading }] = useAddTeacherMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTeacher({
        username,
        email,
        password,
        phone,
        address,
      });

      toast.success("Teacher added successfully!");
      navigate("/teachers");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacher;
