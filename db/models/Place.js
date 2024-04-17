import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  address: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
