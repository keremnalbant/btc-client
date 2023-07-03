import { Guess } from '../models';
import request from '../utils/request';

const prefix = '/guess';

export const makeGuess = async (guess: Guess) => {
  return await request.post(prefix, { guess });
};
