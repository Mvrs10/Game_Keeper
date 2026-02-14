import { type Dispatch, type SetStateAction } from 'react';
import axios from 'axios';

import type IGame from '../types/Game';

interface IGameItem {
    i: number,
    game: IGame,
    setSelectedGame: Dispatch<SetStateAction<IGame>>,
    isAuthorized: boolean,
    userId: string,
    favoriteGames: IGame[],
    setFavoriteGames: Dispatch<SetStateAction<IGame[]>>
}

const GameItem: React.FC<IGameItem> = ({ i, game, setSelectedGame, isAuthorized, userId, favoriteGames, setFavoriteGames }) => {
    const isFavorite = favoriteGames.some(fav => fav._id === game._id);

    const handleGameSelected = (game: IGame) => {
        setSelectedGame(game);
    }

    const addGameToCollection = async () => {
        try {
            const res = await axios.post(`/api/users/${userId}/games/${game._id}`);
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeGameFromCollection = async () => {
        try {
            const res = await axios.delete(`/api/users/${userId}/games/${game._id}`);
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const refreshGameCollection = async () => {
        try {
            if (userId === "") return;
            const response = await axios.get<IGame[]>(`/api/users/${userId}/games`);
            setFavoriteGames(response.data);
        } catch (err) {
            console.log("Error fetching collection:", err)
        }
    }

    const handleStarClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isFavorite) {
            await addGameToCollection();
        }
        else {
            await removeGameFromCollection();
        }
        await refreshGameCollection();
    }

    return (
        <div key={i} className="game-list-item" onClick={() => handleGameSelected(game)}>
            <img src={`/images/${game.image}.webp`} className="game-list-img" alt="icon" />
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>{game.title}</span>
            {isAuthorized && (
                <span className={`star ${isFavorite ? "filled" : ""}`} onClick={handleStarClick}>★</span>
            )}
        </div>
    )
}

export default GameItem;