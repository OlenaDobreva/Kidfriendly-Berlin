import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";
import "@fontsource/ribeye";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ListItem = styled.li`
  position: relative;
`;

const StyledHeader = styled.h1`
  font-family: "Ribeye";
  font-size: 40px;
  margin: 20px;
  color: rgb(50, 50, 50);
  text-align: center;
`;

export default function Home({ toggleFavorite, favoritePlaces }) {
  console.log("favoriteplaces", favoritePlaces);
  const { data, error, isLoading } = useSWR("/api/places");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <StyledHeader>
        <span>Kidfriendly Places of Berlin</span>
      </StyledHeader>
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
                isFavorite={
                  favoritePlaces.error
                    ? false
                    : favoritePlaces?.includes(place._id)
                }
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
