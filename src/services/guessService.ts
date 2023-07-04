import { GuessEnum } from '../models';
import request from '../utils/request';

const prefix = '/guess';

export const makeGuess = async (guess: GuessEnum) => {
  return await request.post(prefix, { guess });
};

export const getGuess = async () => {
  return await request.get<any, GuessEnum | null>(prefix);
};
