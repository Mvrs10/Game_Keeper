import { Html } from '@react-three/drei';

import type IGame from '../types/Game';
import type { Dispatch, SetStateAction } from 'react';

interface IGameList {
  games: IGame[],
  setSelectedGame: Dispatch<SetStateAction<IGame>>
}

const GamesList: React.FC<IGameList> = ({ games, setSelectedGame }) => {
  
  const handleGameSelected = (game: IGame) => {
    setSelectedGame(game);
  }
  
  return (
    <Html
      transform
      position={[-1.3, 0.3, 0]}
      distanceFactor={1.2}
      rotation-x={-Math.PI / 2}
    >
      <div className="game-list">
        {games.map((game, i) => (
          <div key={i} className="game-list-item" onClick={() => handleGameSelected(game)}>
            <img src={`/images/${game.image}.webp`} className="game-list-img" alt="icon" />
            <span>{game.title}</span>
          </div>
        ))}
      </div>
    </Html>
  );
};

export default GamesList;