import { access } from 'fs/promises';

export const isExistFile = async (path) => {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
};
