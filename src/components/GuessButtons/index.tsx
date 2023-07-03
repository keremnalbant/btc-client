import { useCallback, useEffect, useState } from 'react';
import { TbArrowBadgeDownFilled, TbArrowBadgeUpFilled } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { Guess, ToastMessages } from '../../models';
import { makeGuess } from '../../services/guessService';

type GuessButtonsProps = {
  gameId?: string;
};

const GuessButtons = ({ gameId }: GuessButtonsProps) => {
  const [guess, setGuess] = useState<Guess | null>(null);
  const handleClick = useCallback(async (guess: Guess) => {
    try {
      setGuess(guess);
      await makeGuess(guess);
      toast.success(ToastMessages.GUESS_MADE);
    } catch (error: any) {
      // isAxiosError doesn't work here...
      if (error.response.data.detail && error.response.status === 400) {
        toast.error(error?.response?.data?.detail);
      } else {
        setGuess(null);
      }
    }
  }, []);

  useEffect(() => {
    setGuess(null);
  }, [gameId]);

  return (
    <div className="justify-center flex gap-8">
      <button
        data-testid="guess-up-button"
        disabled={!!guess}
        onClick={() => handleClick(Guess.Up)}
        className={`${
          guess === Guess.Up
            ? 'disabled:bg-green-400'
            : 'disabled:bg-slate-700 disabled:bg-opacity-20'
        } py-2 px-8 bg-white bg-opacity-50 rounded-xl text-green-600 hover:text-white font-bold hover:bg-green-600 transition-all text-3xl`}
      >
        <TbArrowBadgeUpFilled />
      </button>
      <button
        data-testid="guess-down-button"
        disabled={!!guess}
        onClick={() => handleClick(Guess.Down)}
        className={`${
          guess === Guess.Down
            ? 'disabled:bg-red-400'
            : 'disabled:bg-slate-700 disabled:bg-opacity-20'
        } py-2 px-8 bg-white bg-opacity-50 rounded-xl text-red-600 hover:text-white font-bold hover:bg-red-600 transition-all text-3xl`}
      >
        <TbArrowBadgeDownFilled />
      </button>
    </div>
  );
};

export default GuessButtons;
