const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({    
  fullName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true, // optional but helpful for ensuring 1 user per email
  },
  password: {
    type: String,
    required: true,
  },    
  amount: {
    type: Number,
    default: 0, // default balance if not provided
  },
});

module.exports = mongoose.model("User", userSchema);
