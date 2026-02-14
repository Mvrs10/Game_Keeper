import { Html } from '@react-three/drei';

import type IGame from '../types/Game';
import type { Dispatch, SetStateAction } from 'react';

import GameItem from './GameItem';

interface IGameList {
  games: IGame[],
  setSelectedGame: Dispatch<SetStateAction<IGame>>,
  isAuthorized: boolean;
}

const GamesList: React.FC<IGameList> = ({ games, setSelectedGame, isAuthorized }) => {

  return (
    <Html
      transform
      position={[-1.3, 0.3, 0]}
      distanceFactor={1.2}
      rotation-x={-Math.PI / 2}
    >
      <div className="game-list">
        {games.map((game, i) => (
          <GameItem key={game._id} i={i} game={game} setSelectedGame={setSelectedGame} isAuthorized={isAuthorized} />
        ))}
      </div>
    </Html>
  );
};

export default GamesList;