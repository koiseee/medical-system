const Patient = require("../models/patient");

exports.findAllSubmitForm = (req, res, next) => {
  Patient.findAll({
    where: {
      appointment_status: "Submitted",
      status: true,
    },
  })
    .then((user) => {
      if (!user) {  
        return res.status(400).json({
          status: false,
          message: "There's no available",
        });
      }
      return user;
    })
    .then((user) => {
      res.status(200).json({
        status: true,
        user: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findAllInProgress = (req, res, next) => {
  Patient.findAll({
    where: {
      appointment_status: "InProgress",
      status: true,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "There's no available",
        });
      }
      return user;
    })
    .then((user) => {
      res.status(200).json({
        status: true,
        user: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findAllCompleted = (req, res, next) => {
  Patient.findAll({
    where: {
      appointment_status: "Completed",
      status: true,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "There's no available",
        });
      }
      return user;
    })
    .then((user) => {
      res.status(200).json({
        status: true,
        user: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findById = (req, res, next) => {
  const { patientId } = req.body;

  Patient.findOne({
    where: {
      id: patientId,
      status: true,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "There is no patient",
        });
      }
      return user;
    })
    .then((user) => {
      res.status(200).json({
        status: true,
        user: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findAll = (req, res, next) => {
  Patient.findAll({
    where: {
      status: true,
    },
  })
    .then((user) => {
      if (user.length === 0) {
        return res.status(400).json({
          status: false,
          message: "There's no available",
        });
      }
      return user;
    })
    .then((user) => {
      res.status(200).json({
        status: true,
        user: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};
