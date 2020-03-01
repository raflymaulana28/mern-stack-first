const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const balanceSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    balance: { type: Number, required: true, minlength: 4 },
    date: { type: Date, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

const Balance = mongoose.model("Balance", balanceSchema);

module.exports = Balance;
