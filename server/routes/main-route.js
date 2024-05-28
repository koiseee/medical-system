const express = require("express");
const router = express.Router();

const admitRoute = require("./admit/admit");
const dischargeRoute = require("./discharge/discharge");

router.use("/admit", admitRoute);
router.use("/discharge", dischargeRoute);

module.exports = router;
