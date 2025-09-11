export const getRandomPrice = (symbol) => {
  const min = 1000;
  const max = 3000;
  return (Math.random() * (max - min) + min).toFixed(2);
};
