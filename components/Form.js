import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);

    const response = await fetch("/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });

    if (response.ok) {
      router.push("/");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Rating:
          <input type="number" name="rating" min="1" max="5" required />
        </label>
        <label>
          Address:
          <input type="text" name="address" required />
        </label>
        <label>
          Type:
          <select name="type" required>
            <option value="jump-house">Jump House</option>
            <option value="cafe">Cafe</option>
            <option value="museum">Museum</option>
            <option value="park">Park</option>
          </select>
        </label>
        <label>
          Image URL:
          <input type="url" name="image" />
        </label>
        <label>
          Map URL:
          <input type="url" name="mapURL" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
