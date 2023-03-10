import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
