import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useState } from "react";

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  console.log(id, "id");
  const {
    data: place,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? `/api/places/${id}` : null);
  console.log(place, "place");

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);

    const response = await fetch(`/api/places/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });
    if (response.ok) {
      mutate();
      setEditMode(false);
    }
  }

  async function deletePlace(id) {
    await fetch(`/api/places/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  async function handleSubmitComment(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const commentData = Object.fromEntries(formData);

    const response = await fetch(`/api/places/${id}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      mutate();
    }
  }
  const comments = place.comments;
  return (
    <>
      <Link href={"/"}>back</Link>
      {place && !editMode && (
        <>
          <Image src={place.image} width="350" height="300" alt=""></Image>
          <h2>
            {place.name}, {place.address}
          </h2>
          <Link href={place.mapURL}>Location on Google Maps</Link>
          <p>{place.rating}</p>
          <p>{place.type}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button type="button" onClick={() => deletePlace(place._id)}>
            Delete
          </button>
        </>
      )}
      {editMode && (
        <form onSubmit={handleEdit}>
          <label>
            Name:
            <input type="text" name="name" defaultValue={place.name} />
          </label>
          <label>
            Address:
            <input type="text" name="address" defaultValue={place.address} />
          </label>
          <label>
            Image:
            <input type="link" name="image" defaultValue={place.image} />
          </label>
          <label>
            Type:
            <input type="text" name="type" defaultValue={place.type} />
          </label>
          <label>
            Google Map Link:
            <input type="link" name="mapurl" defaultValue={place.mapURL} />
          </label>

          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      )}
      <form onSubmit={handleSubmitComment}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Comment:
          <input type="text" name="comment" />
        </label>
        <button type="submit">Add comment</button>
      </form>
      {comments && (
        <>
          <h4> There are {comments.length} comments to this place:</h4>
          {comments.map(({ name, comment }, idx) => {
            return (
              <>
                <p key={idx}>
                  <small>
                    <strong>{name}</strong> commented on {place.name}
                  </small>
                </p>
                <span>{comment}</span>
              </>
            );
          })}
        </>
      )}
    </>
  );
}
