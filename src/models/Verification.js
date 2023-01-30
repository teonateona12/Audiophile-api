import mongoose from "mongoose";

const { Schema } = mongoose;

const verificationSchema = new Schema({
  hash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Verify = mongoose.model("Verify", verificationSchema);

export default Verify;
