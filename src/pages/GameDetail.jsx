import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../services/api";
import { useFavorites } from "../hooks/useFavorites";
import SiteNav from "../components/SiteNav";

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState("loading");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadGame = async () => {
      setStatus("loading");
      try {
        const data = await getGameDetails(id);
        setGame(data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };
    loadGame();
  }, [id]);

  return (
    <div className="app">
      <SiteNav />

      {status === "loading" && <p className="state-message">Loading game...</p>}
      {status === "error" && (
        <p className="state-message state-message--error">⚠ We couldn't load this game.</p>
      )}

      {status === "success" && (
        <article className="game-detail">
          <Link to="/" className="game-detail__back">← Back to search</Link>

          <div className="game-detail__layout">
            <div>
              <img className="game-detail__hero" src={game.background_image} alt={game.name} />
              <div className="game-detail__facts">
                {game.released && (
                  <p className="game-detail__fact">Released: <strong>{game.released}</strong></p>
                )}
                {game.metacritic && (
                  <p className="game-detail__fact">Metacritic: <strong>{game.metacritic}</strong></p>
                )}
              </div>
              <button
                className={`favorite-btn ${isFavorite(game.id) ? "favorite-btn--active" : ""}`}
                style={{ marginTop: "1rem" }}
                onClick={() => toggleFavorite(game)}
              >
                {isFavorite(game.id) ? "♥ Saved" : "♡ Save to favorites"}
              </button>
            </div>

            <div className="game-detail__info">
              <h1>{game.name}</h1>
              <p className="game-detail__rating">⭐ {game.rating}</p>

              {game.genres?.length > 0 && (
                <ul className="game-detail__tags">
                  {game.genres.map((g) => <li key={g.id}>{g.name}</li>)}
                </ul>
              )}

              <p className="game-detail__description" dangerouslySetInnerHTML={{ __html: game.description_raw }} />

              <h3>Platforms</h3>
              <ul className="game-detail__tags">
                {game.platforms?.map((p) => (
                  <li key={p.platform.id}>{p.platform.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

export default GameDetail;