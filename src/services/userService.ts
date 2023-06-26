import { User } from "../models/entities/User";
import request from "../utils/request";

export const getMe = async () => {
  return await request.get<any, User>("/user/me");
};

export const getActiveUsers = async () => {
  return await request.get<any, number>("user/active-users");
};

export const createUser = async () => {
  return await request.post<any, User>("/user");
};
