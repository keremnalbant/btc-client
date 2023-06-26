import request from "../utils/request";

export const createCookie = async () => {
  return await request.get("utils/create-cookie");
};
