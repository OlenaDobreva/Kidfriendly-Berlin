import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  favPlaces: [{ type: Schema.Types.ObjectId, ref: "Place" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
