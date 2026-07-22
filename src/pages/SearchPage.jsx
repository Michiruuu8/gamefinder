import {useState, useEffect} from "react";
import { searchGames, getGenres, getPlatforms } from "../services/api";
import {useFavorites } from "../hooks/useFavorites";
import GameCard from "../components/GameCard";
import "../App.css";
import { Link } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState("idle");

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(""); 

  const {favorites, isFavorite, toggleFavorite} = useFavorites();

  useEffect(() =>{
    const loadFilters = async () => {
      const genresData = await  getGenres();
      const platformsData = await getPlatforms();
      setGenres(genresData);
      setPlatforms(platformsData);
    };
    loadFilters();
  }, []);

    const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim() && !selectedGenre && !selectedPlatform) return;

    setStatus("loading");

    try{
      const results = await searchGames(query, selectedGenre, selectedPlatform);
      setGames(results);
      setStatus("success");
    } catch (error) {
      setGames([]);
      setStatus("error");
    }
  };

  return (
    <div className="app">
      <h1>Game Finder</h1>
      <Link to="/favorites">Go to Favorites</Link>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a game..."
        />
        <button type="submit">Search</button>

        <select value={selectedGenre} onChange={(e)=> setSelectedGenre(e.target.value)}>
          <option value="">All the genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.slug}>
              {genre.name}
            </option>
          ))}
        </select>

        <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
          <option value="">All the platforms</option>
          {platforms.map((platforms) => (
            <option key={platforms.id} value={platforms.id}>
              {platforms.name}
            </option>
          ))}
        </select>

      </form>

      {status === "loading" && <p>Loading results...</p>}
      {status === "error" && (
        <p>An error occurred while searching. Please try again. </p>
      )}

      {status === "success" && (
        <div className="game-grid">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game}
              isFavorite={isFavorite(game.id)
              }
              onToggleFavorite={() => toggleFavorite(game)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
