import { type Dispatch, type SetStateAction, useState, useContext } from 'react';
import type IGame from '../types/Game';

interface IGameItem {
    i: number,
    game: IGame,
    setSelectedGame: Dispatch<SetStateAction<IGame>>,
    isAuthorized: boolean;
}

const GameItem: React.FC<IGameItem> = ({ i, game, setSelectedGame, isAuthorized }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const handleGameSelected = (game: IGame) => {
        setSelectedGame(game);
    }

    const handleStarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    }
    return (
        <div key={i} className="game-list-item" onClick={() => handleGameSelected(game)}>
            <img src={`/images/${game.image}.webp`} className="game-list-img" alt="icon" />
            <span style={{fontSize: "20px", fontWeight: "bold"}}>{game.title}</span>
            {isAuthorized && (
                <span className={`star ${isFavorite ? "filled" : ""}`} onClick={handleStarClick}>★</span>
            )}            
        </div>
    )
}

export default GameItem;