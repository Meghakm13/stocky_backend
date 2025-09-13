export const getRandomPrice = (symbol) => {
  const base = Math.abs(Array.from(symbol).reduce((acc, ch) => acc + ch.charCodeAt(0), 0));
  const variance = (base % 1000) / 100;
  const price = 1000 + (base % 2000) + variance;
  return price.toFixed(2);
};
