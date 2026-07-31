import { createContext, useContext, useState, useEffect } from "react";
import { searchGames, getGenres, getPlatforms } from "../services/api";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState("idle");
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const loadFilters = async () => {
      const genresData = await getGenres();
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
    setPage(1);
    try {
      const { results, hasMore } = await searchGames(query, selectedGenre, selectedPlatform, 1);
      setGames(results);
      setHasMore(hasMore);
      setStatus("success");
    } catch (error) {
      setGames([]);
      setStatus("error");
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    try {
      const { results, hasMore } = await searchGames(query, selectedGenre, selectedPlatform, nextPage);
      setGames((prev) => [...prev, ...results]);
      setPage(nextPage);
      setHasMore(hasMore);
    } catch (error) {
      setHasMore(false);
    }
  };

  const value = {
    query, setQuery, games, status, genres, platforms,
    selectedGenre, setSelectedGenre, selectedPlatform, setSelectedPlatform,
    hasMore, handleSearch, handleLoadMore,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearchContext() {
  return useContext(SearchContext);
}