import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";

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
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/places", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log("list of places", data);

  return (
    <>
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
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
