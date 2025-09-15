const mockStore = {
  rewards: [],
  addReward(reward) {
    const newReward = {
      id: this.rewards.length + 1,
      ...reward,
      rewardTimestamp: reward.rewardTimestamp || new Date(),
    };
    this.rewards.push(newReward);
    return newReward;
  },
};

export const getAllRewards = async (req, res) => {
  return res.json({ rewards: mockStore.rewards });
};

export const createReward = async (req, res) => {
  try {
    const { userId, stockSymbol, quantity, timestamp } = req.body;

    if (!userId || !stockSymbol || !quantity) {
      return res
        .status(400)
        .json({ message: "userId, stockSymbol and quantity are required" });
    }

    const reward = mockStore.addReward({
      userId,
      stockSymbol,
      quantity,
      rewardTimestamp: timestamp,
    });

    return res
      .status(201)
      .json({ message: "Reward recorded (in-memory)", data: reward });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error recording reward", error: err.message });
  }
};
