import { Guess } from "../models";
import request from "../utils/request";

export const makeGuess = async (guess: Guess) => {
  return await request.post(`/guess?guess=${guess}`);
};
