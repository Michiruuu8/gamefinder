import {useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../services/api";

function GameDetail() {
    const {id} = useParams();
    const [game, setGame] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const loadGame = async () => {
            setStatus("loading");
            try{
                const data =await getGameDetails(id);
                setGame(data);
                setStatus("success");
            }catch(error) {
                setStatus("error");
            }
        };
        loadGame();
}, [id]);

if (status === "loading") return <p>Loading...</p>;
if (status === "error") return <p>We couldn´t fetch the game details.</p>;

return (
    <div className="game-detail">
        <Link to="/"> ← Return to Search</Link>
        <h1>{game.name}</h1>
        <img src={game.background_image} alt={game.name} />
        <p>⭐ {game.rating}</p>
        <p>{game.description_raw}</p>
        <h3>Platforms</h3>
        <ul>
            {game.platforms?.map((p) => (
                <li key={p.platform.id}>{p.platform.name}</li>
            ))}
        </ul>
    </div>
   );
}

export default GameDetail;