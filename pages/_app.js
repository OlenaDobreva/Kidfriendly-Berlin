import Layout from "@/components/Layout";
import "@/styles/globals.css";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

export default function App({ Component, pageProps, session }) {
  const { mutate } = useSWRConfig();
  const {
    data: favoritePlaces,
    error,
    isLoading,
  } = useSWR("/api/users", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log("FAVORITE PLACES", favoritePlaces);

  const toggleFavorite = async (placeId) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placeId }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark place as favorite");
      }
      const updatedFavorites = await response.json();
      mutate("/api/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <SessionProvider session={session}>
            <Component
              toggleFavorite={toggleFavorite}
              {...pageProps}
              favoritePlaces={favoritePlaces}
            />
          </SessionProvider>
        </SWRConfig>
      </Layout>
    </>
  );
}
