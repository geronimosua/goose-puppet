export const getRandomElement = (list: any[]): typeof list[0] => {
  return list[Math.floor(Math.random() * list.length)];
};
