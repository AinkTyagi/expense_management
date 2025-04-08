const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const { fullName, emailId, password, amount } = req.body;

    if (!fullName || !emailId || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const newUser = new User({
      fullName,
      emailId,
      password,
      amount, 
    });

    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addMoney = async (req, res) => {
  try {
    const { emailId, amount } = req.body;

    if (!emailId || typeof amount !== 'number') {
      return res.status(400).json({ message: "emailId and numeric amount are required" });
    }

    const user = await User.findOne({ emailId });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.amount += amount;
    await user.save();

    res.status(200).json({ message: "Money added", balance: user.amount });
  } catch (err) {
    console.error("Error adding money:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const subtractMoney = async (req, res) => {
  try {
    const { emailId, amount } = req.body;

    if (!emailId || typeof amount !== 'number') {
      return res.status(400).json({ message: "emailId and numeric amount are required" });
    }

    const user = await User.findOne({ emailId });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.amount < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.amount -= amount;
    await user.save();

    res.status(200).json({ message: "Money subtracted", balance: user.amount });
  } catch (err) {
    console.error("Error subtracting money:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getBalance = async (req, res) => {
  try {
    const { emailId } = req.params;

    const user = await User.findOne({ emailId });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ balance: user.amount });
  } catch (err) {
    console.error("Error getting balance:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createUser,
  addMoney,
  subtractMoney,
  getBalance,
};
