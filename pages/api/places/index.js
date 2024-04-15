import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.find();
      console.log("places", places);
      return response.status(200).json(places);
    } catch (error) {
      return response.status(405).json({ message: "Method not allowed" });
    }
  }
  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: "New place successfully created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
