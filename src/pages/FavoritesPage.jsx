import { useFavorites } from "../hooks/useFavorites";
import GameCard from "../components/GameCard";
import SiteNav from "../components/SiteNav";

function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="app">
      <SiteNav />
      <h1 className="page-title">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="state-message">◌ You haven't saved any games yet.</p>
      ) : (
        <div className="game-grid">
          {favorites.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              index={index}
              isFavorite={isFavorite(game.id)}
              onToggleFavorite={() => toggleFavorite(game)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;