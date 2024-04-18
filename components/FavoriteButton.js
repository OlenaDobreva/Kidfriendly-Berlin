import styled from "styled-components";

export default function FavoriteButton(isFavorite, onToggleFavorite, id) {
  console.log(onToggleFavorite, "ontoggle");
  return (
    <>
      <button type="button" onClick={() => onToggleFavorite(id)}>
        {isFavorite ? "🤍" : "❤️"}
      </button>
    </>
  );
}
