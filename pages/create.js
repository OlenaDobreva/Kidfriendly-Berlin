import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

export default function CreatePlacePage() {
  const router = useRouter();

  async function addPlace(place) {
    const response = await fetch("/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });

    if (response.ok) {
      router.push("/");
    }
  }
  return (
    <>
      <h2 id="add-place">Add New Place</h2>
      <Link href="/">Go Back</Link>
    </>
  );
}
