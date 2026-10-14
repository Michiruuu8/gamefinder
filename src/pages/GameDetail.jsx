import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails, getGameScreenshots } from "../services/api";
import { useFavorites } from "../hooks/useFavorites";
import ScrollNav from "../components/ScrollNav";
import FlexCarousel from "../components/FlexCarousel";
import { shortenDescription } from "../lib/shortDescription";
import Footer from "../components/Footer";

const CARD_HEIGHT = 0.3;

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [status, setStatus] = useState("loading");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;

    const loadGame = async () => {
      setStatus("loading");
      setScreenshots([]);

      try {
        const data = await getGameDetails(id);
        if (cancelled) return;
        setGame(data);
        setStatus("success");
      } catch (error) {
        if (!cancelled) setStatus("error");
        return;
      }

      // Las capturas se piden aparte: si fallan, la página igual se muestra completa
      try {
        const shots = await getGameScreenshots(id);
        if (!cancelled) setScreenshots(shots);
      } catch (error) {
        if (!cancelled) setScreenshots([]);
      }
    };

    loadGame();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const platforms = game?.platforms?.map((p) => p.platform) ?? [];
  const stores = game?.stores?.filter((s) => s.store) ?? [];

  const carouselItems = screenshots.map((shot, index) => ({
    src: shot.image,
    alt: `${game?.name} screenshot ${index + 1}`,
  }));

  return (
    <div className="detail-page">
      <ScrollNav alwaysVisible />

      {status === "loading" && <p className="state-message detail-state">Loading game...</p>}
      {status === "error" && (
        <p className="state-message state-message--error detail-state">⚠ We couldn't load this game.</p>
      )}

      {status === "success" && game && (
        <article>
          <div className="detail-topbar">
            <Link to="/" className="detail-back">← Back to search</Link>
          </div>

          <header className="detail-header">
            <button
              className={`favorite-btn ${isFavorite(game.id) ? "favorite-btn--active" : ""}`}
              onClick={() => toggleFavorite(game)}
            >
              {isFavorite(game.id) ? "Saved" : "Save to favorites"}
            </button>

            <h1 className="detail-title">{game.name}</h1>

            {game.released && <p className="detail-released">Released: {game.released}</p>}

            {game.description && (
              <div className="detail-description">
                <p>{shortenDescription(game.description)}</p>
              </div>
            )}

            {platforms.length > 0 && (
              <>
                <h2 className="detail-heading">Platforms</h2>
                <ul className="detail-pills">
                  {platforms.map((p) => (
                    <li key={p.id}>{p.name}</li>
                  ))}
                </ul>
              </>
            )}
          </header>

          {carouselItems.length > 0 && (
            <section
              className="detail-carousel"
              aria-label="Screenshots"
              style={{ "--card": CARD_HEIGHT }}
            >
              <FlexCarousel
                items={carouselItems}
                preset="liquid"
                intro="rise"
                cardHeight={CARD_HEIGHT}
                gap={12}
                squeeze={0.2}
                focusOnClick
                captions
                fit="natural"
                radius={0}
                lensWidth={0.74}
                lensHeight={1.18}
                tilt={62}
                roundness={1}
                bend={0.34}
                reach={0.38}
                curl="twist"
                dispersion={0.45}
                liquid={0}
                followCursor={false}
                autoplay={false}
                interval={4}
                captureWheel
              />
            </section>
          )}

          {stores.length > 0 && (
            <section className="detail-stores">
              <h2 className="detail-heading">Where to buy?</h2>
              <ul className="detail-store-list">
                {stores.map((s) => (
                  <li key={s.store.id}>
                    <a
                      href={s.url || (s.store.domain ? `https://${s.store.domain}` : "#")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-store"
                      title={s.store.name}
                      aria-label={`Buy on ${s.store.name}`}
                    >
                      {s.store.domain ? (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${s.store.domain}&sz=64`}
                          alt={s.store.name}
                        />
                      ) : (
                        <span>{s.store.name}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      )}

      <Footer />
    </div>
  );
}

export default GameDetail;
