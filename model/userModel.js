const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "invalid email address",
    },
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: (value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+/.test(value);
      },
      message:
        "Password must have at least one uppercase, one lowercase one digit and one special character and be at least 6 characters long",
    },
  },
  house: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "house" }],
  },
  role: {
    type: String,
    default: "lessee",
  },
  idCard: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSNVadl7hVUSbVON7Y3Zya3A58yOHJx3unQ&usqp=CAU",
  },
});

module.exports = mongoose.model("user", userSchema);
