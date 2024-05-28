const express = require("express");
const validation = require("../../middlewares/route-validation");
const { body, param } = require("express-validator");

const Patient = require("../../models/patient");
const router = express.Router();

const {
  dischargePatient,
  deleteComplete,
} = require("../../controllers/discharge");

router.put(
  "/discharge-patient",
  [
    body("patientId").notEmpty(),
    body("discharge_date").notEmpty(),
    body("discharge_by").notEmpty(),
    body("reason").notEmpty(),
  ],
  dischargePatient
);

router.delete(
  "/delete-complete",
  [body("patientId").notEmpty()],
  validation,
  deleteComplete
);

module.exports = router;
