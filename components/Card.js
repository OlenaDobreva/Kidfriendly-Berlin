import Image from "next/image";
import Link from "next/link.js";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  border: 5px solid rgb(150, 181, 120);
  border-radius: 15px;
  background-color: ivory;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled(Image)`
  border-radius: 10px;
  // height: 140px;
  // width: 100%;
`;

const StyledLink = styled.a`
  color: blue;
  text-decoration: underline;
  margin-top: 10px;
  transition: color 0.2s;

  &:hover {
    color: darkblue;
  }
`;

export default function Card({
  name,
  rating,
  address,
  type,
  image,
  mapURL,
  id,
  isFavorite,
  toggleFavorite,
}) {
  return (
    <StyledCard>
      <h3>
        {name}{" "}
        <FavoriteButton
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          id={id}
        />
      </h3>
      <CardImage
        src={image}
        alt="kidfriendly place"
        width={250}
        height={140}
        layout="responsive"
      />
      <p>Rating: {rating}⭐ from 5</p>
      <p>Address: {address}</p>
      <p>Type: {type}</p>
      <StyledLink href={mapURL}>Google Map Link:</StyledLink>
      <StyledLink href={`/details/${id}`}>See more...</StyledLink>
    </StyledCard>
  );
}
