import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import ScrollNav from "../components/ScrollNav";

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateArrows();
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [favorites.length, updateArrows]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    const card = track?.querySelector(".fav-card");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="favorites-page">
      <ScrollNav alwaysVisible />

      <div className="detail-topbar">
        <Link to="/" className="detail-back">← Back to search</Link>
      </div>

      <h1 className="favorites-title">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="state-message">◌ You haven't saved any games yet.</p>
      ) : (
        <section className="favorites-carousel" aria-label="Favorite games">
          <div className="fav-track" ref={trackRef}>
            {favorites.map((game) => (
              <article key={game.id} className="fav-card">
                <Link
                  to={`/game/${game.id}`}
                  className="fav-card__media"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {game.background_image && <img src={game.background_image} alt="" />}
                  {game.rating > 0 && <span className="fav-card__rating">⭐ {game.rating}</span>}
                </Link>

                <div className="fav-card__body">
                  <h3 className="fav-card__title">
                    <Link to={`/game/${game.id}`}>{game.name}</Link>
                  </h3>
                  <button
                    className="fav-card__saved"
                    onClick={() => toggleFavorite(game)}
                    title="Remove from favorites"
                    aria-label={`Remove ${game.name} from favorites`}
                  >
                    Saved
                  </button>
                </div>
              </article>
            ))}
          </div>

          {(canPrev || canNext) && (
            <div className="fav-controls">
              <button
                className="fav-arrow"
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                aria-label="Previous"
              >
                ←
              </button>
              <button
                className="fav-arrow"
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                aria-label="Next"
              >
                →
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default FavoritesPage;
