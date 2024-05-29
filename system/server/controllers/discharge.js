const { dischargeEmail, transporter } = require("../helpers/emailHelper");
const Patient = require("../models/patient");

exports.dischargePatient = (req, res, next) => {
  const { patientId, discharge_date, discharge_by, reason } = req.body;

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
        user.appointment_status = "Completed";
        user.patient_status = "Discharge";
        user.discharge_date = discharge_date;
        user.discharge_by = discharge_by;
        user.reason = reason;
        return user.save();
      }
    })
    .then((user) => {
      const mailOptions = dischargeEmail(
        user.email_address,
        discharge_date,
        discharge_by,
        reason
      );
      transporter.sendMail(mailOptions);
      return res.status(200).json({
        success: true,
        message: "Patient admitted successfully",
        user,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteComplete = (req, res, next) => {
  const { patientId } = req.body;

  Patient.findOne({
    where: {
      id: patientId,
      appointment_status: "Completed",
      status: true,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Patient not found" });
      } else {
        user.destroy();
      }
    })
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Patient Deleted" });
    })
    .catch((err) => {
      next(err);
    });
};
