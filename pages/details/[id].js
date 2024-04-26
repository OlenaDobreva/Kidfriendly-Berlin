import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "@/components/FavoriteButton";
import Map from "@/components/GoogleMap";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 450px;
  border: 5px solid rgb(150, 181, 120);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ivory;
`;

const StyledLink = styled.a`
  color: blue;
  text-decoration: underline;
  margin: 10px;
  transition: color 0.2s;

  &:hover {
    color: darkblue;
  }
`;
const StyledButton = styled.button`
  background-color: lightgray;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  border: 1.5px solid darkgray;
  font-size: inherit;
  min-width: 85px;
  max-width: 170px;
  width: auto;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  height: 300px;
  width: auto;
`;

export default function DetailsPage({ toggleFavorite, favoritePlaces }) {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const {
    data: place,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? `/api/places/${id}` : null);

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
      {/* <StyledLink href={"/"}>back</StyledLink> */}
      {place && !editMode && (
        <>
          <StyledImage
            src={place.image}
            width="350"
            height="300"
            alt=""
          ></StyledImage>
          <h2>
            {place.name}, {place.address}
          </h2>
          <p>
            <strong>
              {place.type} {place.rating}⭐ from 5
            </strong>
          </p>

          <StyledLink href={place.mapURL}>Location on Google Maps</StyledLink>
          <Map address={place.address} />

          <StyledButton onClick={() => setEditMode(true)}>Edit</StyledButton>
          <StyledButton type="button" onClick={() => deletePlace(place._id)}>
            Delete
          </StyledButton>
          <FavoriteButton
            isFavorite={favoritePlaces.includes(id)}
            toggleFavorite={toggleFavorite}
            id={id}
          />
        </>
      )}
      {editMode && (
        <StyledForm onSubmit={handleEdit}>
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

          <StyledButton type="submit">Update</StyledButton>
          <StyledButton type="button" onClick={() => setEditMode(false)}>
            Cancel
          </StyledButton>
        </StyledForm>
      )}
      <StyledForm onSubmit={handleSubmitComment}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Comment:
          <textarea name="comment" rows={5} cols={50} />
        </label>
        <StyledButton type="submit">Add comment</StyledButton>
      </StyledForm>
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
