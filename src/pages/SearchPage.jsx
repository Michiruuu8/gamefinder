// src/pages/SearchPage.jsx
import { useFavorites } from "../hooks/useFavorites";
import { useSearchContext } from "../context/SearchContext";
import GameCard from "../components/GameCard";
import SkeletonCard from "../components/SkeletonCard";
import "../App.css";
import ScrollNav from "../components/ScrollNav";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import PixelSwap from "../components/PixelSwap";
import InteractiveText from "../components/InteractiveText";

function SearchPage() {
  const {
    query, setQuery, games, status, genres, platforms,
    selectedGenre, setSelectedGenre, selectedPlatform, setSelectedPlatform,
    hasMore, handleSearch, handleLoadMore,
  } = useSearchContext();

  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <>

      <ScrollNav />
      
      {/* SECCIÓN HERO */}
    <section className="hero-pin">

      {/* PixelSwap limitado únicamente a esta sección */}
      <div className="hero-pixels">
        <PixelSwap
          firstContent={
            <div className="hero-pixel-content hero-pixel-content--dark">
              <h1 className="hero-pixel-title">GameFinder</h1>
              <p className="hero-pixel-tagline">
                Search. Filter. Save what you love.
              </p>
            </div>
          }
          secondContent={
            <div className="hero-pixel-content hero-pixel-content--light">
              <h1 className="hero-pixel-title">GameFinder</h1>
              <p className="hero-pixel-tagline">
                Search. Filter. Save what you love.
              </p>
            </div>
          }
          pixelSize={48}
          gap={0}
          pixelRadius={0}
          pixelSpin={0}
          pixelScale={0.35}
          duration={1200}
          pixelDuration={420}
          pattern="random"
          randomness={0}
          fade
          trigger="hover"
          aspectRatio="auto"
          style={{
            width: "100%",
            height: "100%"
          }}
        />
      </div>

      {/* Contenido del Hero */}
      <header className="site-header">

        <div className="scroll-hint">
          ↓ Scroll to explore
        </div>

      </header>

    </section>

      {/* CONTENIDO DESLIZABLE (CUBRE AL HERO AL HACER SCROLL) */}
      <main className="app">
        <motion.form
          onSubmit={handleSearch}
          className="search-console"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="search-console__input-wrap">
            <span className="search-console__prompt">&gt;</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a game..."
            />
          </div>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">All the genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.slug}>{genre.name}</option>
            ))}
          </select>
          <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
            <option value="">All the platforms</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>{platform.name}</option>
            ))}
          </select>
          <MagneticButton type="submit" className="btn-primary">
            Search
          </MagneticButton>
        </motion.form>

        {status === "loading" && (
          <div className="game-grid">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {status === "error" && (
          <p className="state-message state-message--error">⚠ Something went wrong. Try again.</p>
        )}

        {status === "success" && games.length === 0 && (
          <p className="state-message">◌ No games matched your search.</p>
        )}

        {status === "success" && games.length > 0 && (
          <div className="game-grid">
            {games.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                index={index}
                isFavorite={isFavorite(game.id)}
                onToggleFavorite={() => toggleFavorite(game)}
                style={{ animationDelay: `${index * 40}ms` }}
              />
            ))}
          </div>
        )}

        {status === "success" && hasMore && (
          <MagneticButton onClick={handleLoadMore} className="btn-secondary">
            Load more
          </MagneticButton>
        )}
      </main>
    </>
  );
}

export default SearchPage;