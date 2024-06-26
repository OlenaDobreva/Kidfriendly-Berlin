import { useRouter } from "next/router";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 450px;
  border: 5px solid rgb(150, 181, 120);
  border-radius: 7px;
  background-color: ivory;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledFormContainer = styled.div`
  // border: 3px solid darkgray;
  // border-radius: 8px;
  // padding: 20px;
  // width: fit-content;
`;

const StyledButton = styled.button`
  background-color: lightgray;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid darkgray;
  font-size: inherit;
  width: 90px;
`;

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
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit}>
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
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </StyledFormContainer>
  );
}
