/*
  Simple in-memory store for quick testing.
  This lets you POST /reward and then GET /today-stocks/:userId without DB.
*/
const rewards = [];
let nextId = 1;

export const addReward = ({ userId, stockSymbol, quantity, rewardTimestamp }) => {
  const reward = {
    id: nextId++,
    userId,
    stockSymbol,
    quantity: Number(quantity),
    rewardTimestamp: rewardTimestamp ? new Date(rewardTimestamp) : new Date()
  };
  rewards.push(reward);
  return reward;
};

export const getRewardsByUser = (userId) => rewards.filter(r => r.userId === userId);

export const getRewardsByUserAndDate = (userId, date) => {
  const target = new Date(date);
  return rewards.filter(r => {
    const d = new Date(r.rewardTimestamp);
    return r.userId === userId &&
      d.getFullYear() === target.getFullYear() &&
      d.getMonth() === target.getMonth() &&
      d.getDate() === target.getDate();
  });
};

export default { addReward, getRewardsByUser, getRewardsByUserAndDate };
