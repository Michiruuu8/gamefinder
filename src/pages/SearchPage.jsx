import { useFavorites } from "../hooks/useFavorites";
import { useSearchContext } from "../context/SearchContext";
import GameCard from "../components/GameCard";
import SkeletonCard from "../components/SkeletonCard";
import "../App.css";
import { Link } from "react-router-dom";

function SearchPage() {
  const {
    query, setQuery, games, status, genres, platforms,
    selectedGenre, setSelectedGenre, selectedPlatform, setSelectedPlatform,
    hasMore, handleSearch, handleLoadMore,
  } = useSearchContext();

  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="app">
      <header className="site-header">
        <p className="site-header__eyebrow">// game discovery tool</p>
        <h1>Game<span>Finder</span></h1>
        <nav className="site-nav">
          <Link to="/favorites">→ Go to Favorites</Link>
        </nav>
      </header>

      <form onSubmit={handleSearch} className="search-console">
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
        <button type="submit" className="btn-primary">Search</button>
      </form>

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
              isFavorite={isFavorite(game.id)}
              onToggleFavorite={() => toggleFavorite(game)}
              style={{ animationDelay: `${index * 40}ms` }}
            />
          ))}
        </div>
      )}

      {status === "success" && hasMore && (
        <button onClick={handleLoadMore} className="btn-secondary">Load more</button>
      )}
    </div>
  );
}

export default SearchPage;