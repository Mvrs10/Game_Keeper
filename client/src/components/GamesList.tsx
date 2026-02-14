import { Html } from '@react-three/drei';

import type IGame from '../types/Game';
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

import GameItem from './GameItem';

interface IGameList {
  games: IGame[],
  setSelectedGame: Dispatch<SetStateAction<IGame>>,
  isAuthorized: boolean,
  userId: string,
  favoriteGames: IGame[],
  setFavoriteGames: Dispatch<SetStateAction<IGame[]>>
}

const GamesList: React.FC<IGameList> = ({ games, setSelectedGame, isAuthorized, userId, favoriteGames, setFavoriteGames }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 5;

  const left = currentPage * itemsPerPage;
  const right = left + itemsPerPage;
  const displayedGames: IGame[] = games.slice(left, right);
  const totalPages: number = Math.ceil(games.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [games]);

  return (
    <Html
      transform
      position={[-1.3, 0.3, 0]}
      distanceFactor={1.2}
      rotation-x={-Math.PI / 2}
    >
      <div className="game-list">
        {displayedGames.length === 0 ?
          <div key={9999} className="game-list-item">
            <img src={`/images/0.webp`} className="game-list-img" alt="icon" />
          </div>
        :displayedGames.map((game, i) => (
          <GameItem key={game._id} i={i} game={game} setSelectedGame={setSelectedGame} isAuthorized={isAuthorized} userId={userId} favoriteGames={favoriteGames} setFavoriteGames={setFavoriteGames} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => --prev)}>◀</button>
          <span>{currentPage + 1}/{totalPages}</span>
          <button disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(prev => ++prev)}>▶</button>
        </div>
      )}
    </Html>
  );
};

export default GamesList;