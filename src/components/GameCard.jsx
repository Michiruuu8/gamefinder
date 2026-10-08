import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const getRatingTier = (rating) => {
  if (rating >= 4) return "high";
  if (rating >= 2.5) return "mid";
  return "low";
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function GameCard({ game, isFavorite, onToggleFavorite, index = 0 }) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite();
  };

  const tier = getRatingTier(game.rating);

  return (
    <motion.div
      className={`game-card game-card--${tier}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
    >
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
    </motion.div>
  );
}

export default GameCard;