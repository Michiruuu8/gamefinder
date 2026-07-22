import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <img src={game.background_image} alt={game.name} />
      <h3>{game.name}</h3>
      <p>⭐ {game.rating}</p>
    </Link>
  );
}

export default GameCard;