import {useFavorites} from "../hooks/useFavorites";
import GameCard from "../components/GameCard";
import {Link} from "react-router-dom";

function FavoritesPage() {
    const {favorites, isFavorite, toggleFavorite} = useFavorites();

    return (
        <div className="app">
            <h1>Favorites</h1>
            <Link to="/"> ← Return to Search</Link>
            {favorites.length === 0 ? (
                <p>You have no favorite games yet.</p>
            ) : (
                <div className="game-grid">
                    {favorites.map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
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