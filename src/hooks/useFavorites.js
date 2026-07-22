import { useState, useEffect } from 'react';

const STORAGE_KEY = "gamefinder_favorites";

export function useFavorites() {
    const [favorites, setFavorites] = useState(() =>{
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = (gameId) => {
        return favorites.some((game) => game.id === gameId);
    };

    const toggleFavorite = (game) => {
        if (isFavorite(game.id)) {
            setFavorites(favorites.filter((g) => g.id !== game.id));
        } else {
            setFavorites([...favorites, game]);
        }
    };

    return {favorites, isFavorite, toggleFavorite };

}