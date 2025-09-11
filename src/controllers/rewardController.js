export const createReward = async (req, res) => {
  try {
    const { userId, stockSymbol, quantity, timestamp } = req.body;

    res.status(201).json({
      message: "Reward recorded successfully",
      data: { userId, stockSymbol, quantity, timestamp }
    });
  } catch (error) {
    res.status(500).json({ message: "Error recording reward", error: error.message });
  }
};
