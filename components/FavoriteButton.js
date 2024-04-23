import styled from "styled-components";

const StyledHeart = styled.button`
  height: 25px;
  width: 20px;
`;

export default function FavoriteButton({ isFavorite, toggleFavorite, id }) {
  console.log("ISFAVORITE", isFavorite);
  return (
    <>
      <StyledHeart type="button" onClick={() => toggleFavorite(id)}>
        {isFavorite ? "❤️" : "🤍"}
      </StyledHeart>
    </>
  );
}
