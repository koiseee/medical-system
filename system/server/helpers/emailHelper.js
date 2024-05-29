const transporter = require("../helpers/transporter");
const emailTemplates = require("../helpers/emailTemplate");

const admitEmail = (email_address, admission_date, doctor_incharge) => {
  const htmlMessage = emailTemplates.createEmailTemplate(
    admission_date,
    doctor_incharge
  );

  return {
    from: process.env.EMAIL_USER,
    to: email_address,
    subject: "Patient Admission",
    html: htmlMessage,
    admission_date,
    doctor_incharge,
  };
};

const dischargeEmail = (
  email_address,
  discharge_date,
  discharge_by,
  reason
) => {
  const htmlMessage = emailTemplates.createDischargeEmailTemplate(
    discharge_date,
    discharge_by,
    reason
  );

  return {
    from: process.env.EMAIL_USER,
    to: email_address,
    subject: "Patient Discharge",
    html: htmlMessage,
    discharge_date,
    discharge_by,
    reason,
  };
};

module.exports = { transporter, admitEmail, dischargeEmail };
