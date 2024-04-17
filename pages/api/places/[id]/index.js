import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id).populate("comments");

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PUT") {
    await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json({ status: `Place ${id} updated!` });
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} successfully deleted.` });
  }
  if (request.method === "POST") {
    try {
      const commentData = request.body;
      console.log(
        "comment++++++++++++++++++++++++++++++++++++++++++++++",
        commentData
      );
      const newComment = await Comment.create(commentData);
      await Place.findByIdAndUpdate(id, {
        $push: { comments: newComment._id },
      });
      response.status(201).json({ status: "New comment placed" });
    } catch (error) {
      console.log("ERROR", error);
      response.status(400).json({ error: error.message });
    }
  }
}
