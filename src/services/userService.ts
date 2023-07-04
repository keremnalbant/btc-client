import { User } from '../models/entities/User';
import request from '../utils/request';

const prefix = '/user';

export const getMe = async () => {
  return await request.get<any, User>(`${prefix}/me`);
};

export const getActiveUsers = async () => {
  return await request.get<any, number>(`${prefix}/active-users`);
};

export const createUser = async () => {
  return await request.post<any, User>(prefix);
};
