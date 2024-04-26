import useSWR from "swr";
import styled from "styled-components";
import FavoriteCard from "@/components/FavoriteCard";
import "@fontsource/ribeye";

const StyledHeader = styled.h1`
  margin: 20px;
  color: rgb(50, 50, 50);
  font-family: "Ribeye";
`;

export default function FavoritePage({ toggleFavorite }) {
  const { data, error, isLoading, mutate } = useSWR("/api/favorites");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log("DATA", data);
  mutate();
  return (
    <>
      <StyledHeader>Favorite Places</StyledHeader>
      {data.length > 0 ? (
        data.map((place) => (
          <FavoriteCard
            key={place._id}
            name={place.name}
            rating={place.rating}
            address={place.address}
            type={place.type}
            image={place.image}
            mapURL={place.mapURL}
            id={place._id}
            isFavorite={true}
            toggleFavorite={toggleFavorite}
          />
        ))
      ) : (
        <div>No favorite places found</div>
      )}
    </>
  );
}
