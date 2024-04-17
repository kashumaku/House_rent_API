const mongoose = require("mongoose");

const houseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "available",
  },
  location: {
    city: {
      type: String,
    },
    subCity: {
      type: String,
    },
    woreda: {
      type: String,
    },
    specificLocation: {
      type: String,
    },
  },
  image: {
    type: [
      {
        url: String,
        caption: String,
      },
    ],
  },
});

const houseModel = mongoose.model("house", houseSchema);
module.exports = houseModel;
