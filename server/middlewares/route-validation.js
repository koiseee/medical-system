const { validationResult } = require('express-validator');

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation errors occurred",
      data: errors.array()
    });
  }
  next();
};

module.exports = validation;
