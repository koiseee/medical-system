const express = require("express");
const router = express.Router();

const admitRoute = require("./admit/admit");
const dischargeRoute = require("./discharge/discharge");
const patientRoute = require("./patient/patient");

router.use("/admit", admitRoute);
router.use("/discharge", dischargeRoute);
router.use("/find", patientRoute);

module.exports = router;
