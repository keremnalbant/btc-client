export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const getToken = () => {
  const value = localStorage.getItem("user");
  if (!value) return null;
  return JSON.parse(value).id;
};
