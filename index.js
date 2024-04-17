const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./router/userRouter");
const cookieParser = require("cookie-parser");
const houseRouter = require("./router/houseRouter");

const app = express();
dotenv.config();
//middelwares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static("./upload"));
mongoose
  .connect("mongodb://127.0.0.1:27017/House_rent")
  .then(() => console.log("Database connected"));

app.use("/api/user", userRouter);
app.use("/api/house", houseRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log("listening on port: " + process.env.PORT)
);
