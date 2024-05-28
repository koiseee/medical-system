const Patient = require("../models/patient");

exports.sendAppointment = (req, res, next) => {
  const {
    firstname,
    lastname,
    birthday,
    gender,
    address,
    phone_number,
    notes,
  } = req.body;

  Patient.create({
    firstname,
    lastname,
    birthday,
    gender,
    address,
    phone_number,
    notes,
    appointment_status: "Submitted",
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Application Sent",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.cancelAppointment = (req, res, next) => {
  const { patiendId } = req.body;

  Patient.findOne({
    id: patiendId,
    status: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Application does not exist",
        });
      } else {
        user.destroy();
      }
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Appointment Canceled",
      });
    })
    .catch((error) => {
      next(error);
    });
};



//accept or admit
exports.admitPatient = (req, res, next) => {
  const { patientId, admission_date, patient_case, doctor_incharge, } = req.body;

  Patient.findOne({
    where: {
      id: patientId,
      appointment_status: "Submitted",
      status: true,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Application does not exist",
        });
      } else {
        user.patient_status = "Admit";
        user.doctor_incharge = doctor_incharge;
        user.admission_date = admission_date;
        user.case = patient_case;
        user.appointment_status = "InProgress";
        return user.save();
      }
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Patient Admitted",
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.cancelAdmission = (req, res, next) => {
  const { patientId } = req.body;

  Patient.findOne({
    where: {
      id: patientId,
      appointment_status: "Submitted",
      status: true,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Application does not exist",
        });
      } else {
        user.appointment_status = "Canceled";
        user.status = false;
        return user.save();
      }
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Application Canceled",
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.editAdmission = (req, res, next) => {
  const { patientId, admission_date, patient_case, doctor_incharge } = req.body;

  Patient.findOne({
    where: {
      id: patientId,
      appointment_status: "InProgress",
      status: true,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Application does not exist",
        });
      } else {
        user.admission_date = admission_date;
        user.doctor_incharge = doctor_incharge;
        user.case = patient_case;
        return user.save();
      }
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Appointment succesfully updated",
      });
    })
    .catch((error) => {
      next(error);
    });
};


