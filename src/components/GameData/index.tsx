import { useCallback, useEffect } from 'react';
import { useSubscriber } from '../../hooks/useSubscriber';
import { EventName, Game } from '../../models';
import { getGame } from '../../services/gameService';
import { formatPrice } from '../../utils/formatPrice';
import GuessButtons from '../GuessButtons';
import Loader from '../Loader';
import Arrow from './Arrow';
import BitcoinLogo from './BitcoinLogo';

const GameData = () => {
  const [gameData, setGameData] = useSubscriber<Game | null>(
    EventName.Game,
    null,
    (e: any, prev: any) => {
      setGameData(e[0]);
    },
  );

  const fetchGameData = useCallback(async () => {
    const data = await getGame();
    setGameData(data);
  }, [setGameData]);

  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]);

  return (
    <div className="flex flex-col gap-8 items-center content-center p-8 bg-white bg-opacity-40 rounded-xl border-gray-100 shadow-lg">
      <div className="flex gap-4 flex-row justify-between items-center">
        <BitcoinLogo />
        {gameData?.value ? (
          <span className="flex-col flex text-3xl font-semibold">
            {formatPrice(gameData?.value)}
          </span>
        ) : (
          <Loader />
        )}
      </div>
      {gameData?.difference && (
        <div className="flex flex-row justify-center">
          <div
            data-testid="difference-container"
            className={`text-2xl font-semibold flex items-center gap-1
          rounded-lg bg-opacity-50 w-min px-8 ${
            gameData?.difference >= 0 ? 'bg-green-400' : 'bg-red-400'
          } ${gameData?.difference >= 0 ? 'text-green-600' : 'text-red-600'}
          `}
          >
            <span>{gameData?.difference.toFixed(4)}%</span>
            <Arrow difference={gameData.difference} />
          </div>
        </div>
      )}
      <div className="flex flex-row items-center">
        <GuessButtons gameId={gameData?.id} />
      </div>
    </div>
  );
};

export default GameData;
