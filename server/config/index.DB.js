import mongoose from "mongoose";

const DB_NAME = "STB_Appoinment_system";

const connectDB = async () => {
  try {
    const connectionInfo = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `Successfully connected to MongoDB Host: ${connectionInfo.connection.host}`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
