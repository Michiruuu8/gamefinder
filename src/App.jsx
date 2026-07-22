import {Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import GameDetailsPage from "./pages/GameDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/game/:id" element={<GameDetailsPage />} />
    </Routes>
  );
}

export default App;
