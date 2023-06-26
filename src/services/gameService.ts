import { Game } from "../models/entities/Game";
import request from "../utils/request";

export const getGame = async () => {
  return await request.get<any, Game>("/game");
};
