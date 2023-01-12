import mongoose from "mongoose";

const connection = () => {
  try {
    return mongoose.connect(process.env.MONGO_CONNECTION);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default connection;
