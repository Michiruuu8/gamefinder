import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import SearchPage from "./pages/SearchPage";
import GameDetailsPage from "./pages/GameDetail";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/game/:id" element={<GameDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;