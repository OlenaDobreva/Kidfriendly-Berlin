import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import User from "@/db/models/User";
import Place from "@/db/models/Place";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  console.log("session", session);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const userId = session.user.userId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const favoritePlaceIds = user.favPlaces;

      const favoritePlaces = await Place.find({
        _id: { $in: favoritePlaceIds },
      });

      console.log("FAVORITE", favoritePlaces);

      return res.status(200).json(favoritePlaces);
    } catch (error) {
      return res.status(500).json({ error: error.messege });
    }
  } else if (req.method === "POST") {
    try {
      const favoriteData = req.body;
      const userId = session.user.userId;

      let user = await User.findById(userId);

      if (user.favPlaces.includes(favoriteData.placeId)) {
        user.favPlaces.pull(favoriteData.placeId);
      } else {
        user.favPlaces.push(favoriteData.placeId);
      }

      const newFav = await user.save();

      return res
        .status(201)
        .json({ message: "Place marked as favorite successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
