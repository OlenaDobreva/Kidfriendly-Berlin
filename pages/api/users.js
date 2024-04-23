import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import User from "@/db/models/User";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

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
      console.log("+++++++++++++++++++++++", favoritePlaceIds);
      return res.status(200).json(favoritePlaceIds);
    } catch (error) {
      console.log("ERROR", error);
      return res.status(500).json({ error: error.messege });
    }
  }
}
