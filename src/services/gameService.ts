import { Game } from '../models/entities/Game';
import request from '../utils/request';

const prefix = '/game';

export const getGame = async () => {
  return await request.get<any, Game>(prefix);
};
