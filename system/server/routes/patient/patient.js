const express = require("express");
const validation = require("../../middlewares/route-validation");
const { body, param } = require("express-validator");

const Patient = require("../../models/patient");
const router = express.Router();

const {
  findAllSubmitForm,
  findAllInProgress,
  findAllCompleted,
  findById,
  findAll,
} = require("../../controllers/patient");

router.get("/find-submit", findAllSubmitForm);

router.get("/find-inprogress", findAllInProgress);
router.get("/find-complete", findAllCompleted);
router.get("/find-by-id", findById);
router.get("/find-all", findAll);

module.exports = router;
