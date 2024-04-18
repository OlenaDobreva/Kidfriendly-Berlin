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

export default function FavoritePage() {
  const { data, error, isLoading } = useSWR("/api/places");

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  // Filter the list of places to include only favorites
  const favoritePlaces = data.filter((place) => place.isFavorite);

  return (
    <>
      <h1>Favorite Places</h1>
      <List role="list">
        {favoritePlaces.map((place) => (
          <ListItem key={place._id}>
            <FavoriteCard
              name={place.name}
              rating={place.rating}
              address={place.address}
              type={place.type}
              image={place.image}
              mapURL={place.mapURL}
              id={place._id}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
