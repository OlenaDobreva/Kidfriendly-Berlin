import useSWR from "swr";
import styled from "styled-components";
import FavoriteCard from "@/components/FavoriteCard";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
`;

export default function FavoritePage({ toggleFavorite }) {
  const { data, error, isLoading, mutate } = useSWR("/api/favorites");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log("DATA", data);
  mutate();
  return (
    <>
      <h1>Favorite Places</h1>
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
