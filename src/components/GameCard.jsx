import { Link } from "react-router-dom";

const getRatingTier = (rating) => {
  if (rating >= 4) return "high";
  if (rating >= 2.5) return "mid";
  return "low";
};

function GameCard({ game, isFavorite, onToggleFavorite, style }) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite();
  };

  const tier = getRatingTier(game.rating);

  return (
    <div className={`game-card game-card--${tier}`} style={style}>
      <Link to={`/game/${game.id}`} className="game-card__link">
        <div className="game-card__image-wrap">
          <img src={game.background_image} alt={game.name} />
          <span className={`rating-badge rating-badge--${tier}`}>⭐ {game.rating}</span>
        </div>
        <h3>{game.name}</h3>
      </Link>
      <button
        className={`favorite-btn ${isFavorite ? "favorite-btn--active" : ""}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? "♥ Saved" : "♡ Save"}
      </button>
    </div>
  );
}

export default GameCard;