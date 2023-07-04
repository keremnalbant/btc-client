import { useCallback, useEffect, useState } from 'react';
import { TbArrowBadgeDownFilled, TbArrowBadgeUpFilled } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { GuessEnum, ToastMessages } from '../../models';
import { getGuess, makeGuess } from '../../services/guessService';

type GuessButtonsProps = {
  gameId?: string;
};

const GuessButtons = ({ gameId }: GuessButtonsProps) => {
  const [guess, setGuess] = useState<GuessEnum | null>(null);

  const handleClick = useCallback(async (guess: GuessEnum) => {
    try {
      setGuess(guess);
      await makeGuess(guess);
      toast.success(ToastMessages.GUESS_MADE);
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setGuess(error.response.data.detail);
        toast.error(ToastMessages.GUESS_ALREADY_MADE);
      } else {
        setGuess(null);
      }
    }
  }, []);

  useEffect(() => {
    setGuess(null);
  }, [gameId]);

  const fetchGuess = useCallback(async () => {
    const guess = await getGuess();
    setGuess(guess);
  }, []);

  useEffect(() => {
    fetchGuess();
  }, [fetchGuess]);

  return (
    <div className="justify-center flex gap-8">
      <button
        data-testid="guess-up-button"
        disabled={!!guess}
        onClick={() => handleClick(GuessEnum.Up)}
        className={`${
          guess === GuessEnum.Up
            ? 'disabled:bg-green-400'
            : 'disabled:bg-slate-700 disabled:bg-opacity-20'
        } py-2 px-8 bg-white bg-opacity-50 rounded-xl text-green-600 hover:text-white font-bold hover:bg-green-600 transition-all text-3xl`}
      >
        <TbArrowBadgeUpFilled />
      </button>
      <button
        data-testid="guess-down-button"
        disabled={!!guess}
        onClick={() => handleClick(GuessEnum.Down)}
        className={`${
          guess === GuessEnum.Down
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
