import mongoose from "mongoose";
const DB_NAME = "STB_Appointment";

const connectDB = async () => {
  try {
    const connectionInfo = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `succesfully Connected to MongoDB Host:- ${connectionInfo.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
