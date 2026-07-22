import {Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import GameDetailsPage from "./pages/GameDetail";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/game/:id" element={<GameDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}

export default App;
