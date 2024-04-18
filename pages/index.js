import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";
import { useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";

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

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/places");
  const [favorites, setFavorites] = useState([]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const toggleFavorite = (id) => {
    const index = favorites.indexOf(id);
    if (index !== -1) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <>
      <h1>Kidfriendly Places of Berlin</h1>
      <List role="list">
        {data.map((place) => {
          const isFavorite = favorites.includes(place._id);
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                rating={place.rating}
                address={place.address}
                type={place.type}
                image={place.image}
                mapURL={place.mapURL}
                id={`${place._id.$oid ?? place._id}`}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
