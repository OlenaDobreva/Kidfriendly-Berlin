import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  border: 3px solid darksalmon;
  border-radius: 15px;
  background-color: ivory;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default function FavoriteCard({
  name,
  rating,
  address,
  type,
  image,
  mapURL,
  id,
}) {
  return (
    <StyledCard>
      <h3>{name}</h3>
      <Image src={image} width={160} height={140} alt={name} />
      <p>Rating: {rating}⭐ from 5</p>
      <p>Address: {address}</p>
      <p>Type: {type}</p>
      <Link href={mapURL}>Google Map Link</Link>
    </StyledCard>
  );
}
