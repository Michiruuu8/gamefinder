import axios from "axios";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const searchGames = async (query, genre = "", platform = "") => {
    try{
        const response = await axios.get(`${BASE_URL}/games`,{
            params: {
                key: API_KEY,
                search: query,
                search_precise: true,
                genres: genre || undefined,
                platforms: platform || undefined,
                page_size: 12,
            },
        });
        return response.data.results;
    } catch(error){
        console.error("Error searching games: ", error);
        throw error;
    }
};

export const getGenres = async () => {
    const response = await axios.get(`${BASE_URL}/genres`,{
        params: {key: API_KEY},
    });
    return response.data.results;
};

export const getPlatforms = async () => {
    const response = await axios.get(`${BASE_URL}/platforms`,{
        params: {key: API_KEY},
    });
    return response.data.results;
};

export const getGameDetails = async (id) => {
    try{
        const response = await axios.get(`${BASE_URL}/games/${id}`,{
            params: {key: API_KEY},
        });
        return response.data;
    }
    catch(error){
        console.error("Error fetching game details: ", error);
        throw error;
    }
};