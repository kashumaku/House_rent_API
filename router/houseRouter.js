const houseController = require("../controller/houseController");
const upload = require("../utils/multer");

const houseRouter = require("express").Router();
houseRouter.post("/register", upload.single("file"), houseController);

module.exports = houseRouter;
