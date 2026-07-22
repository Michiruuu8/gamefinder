import { Link } from "react-router-dom";

function GameCard({ game, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite();
  }

  return (
    <div className ="game-card">
      <Link to={`/game/${game.id}`} >
        <img src={game.background_image} alt={game.name} />
        <h3>{game.name}</h3>
        <p>⭐ {game.rating}</p>
      </Link>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? "Saved" : "Save"}
      </button>
    </div> 
  );
}

export default GameCard;
