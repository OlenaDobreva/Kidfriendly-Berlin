import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  console.log(place);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <Link href={"/"}>back</Link>
      {place && (
        <Image src={place.image} width="350" height="300" alt=""></Image>
      )}
      {place && (
        <>
          <h2>
            {place.name}, {place.address}
          </h2>
          <Link href={place.mapURL}>Location on Google Maps</Link>
          <p>{place.rating}</p>
          <p>{place.type}</p>
          <button>
            <Link href={`/places/${id}/edit`}>Edit</Link>
          </button>

          {/* <button onClick={deletePlace} type="button" variant="delete">
            Delete
          </button> */}
          {/* <Comments locationName={place.name} comments={comments} /> */}
        </>
      )}
    </>
  );
}
