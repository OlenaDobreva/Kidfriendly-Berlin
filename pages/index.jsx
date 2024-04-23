import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";
import "@fontsource/spicy-rice";

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

const StyledHeader = styled.h1`
  font-family: "Spicy Rice";
  font-size: 40px;
  font-weight: 100;
  margin: 20px;
  color: rgb(51, 50, 50);
`;

export default function Home({ toggleFavorite, favoritePlaces }) {
  console.log("favoriteplaces", favoritePlaces);
  const { data, error, isLoading } = useSWR("/api/places");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <StyledHeader>Kidfriendly Places of Berlin</StyledHeader>
      <List role="list">
        {data.map((place) => {
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
                toggleFavorite={toggleFavorite}
                isFavorite={favoritePlaces.includes(place._id)}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}