const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const Patient = sequelizeConnect.define(
  "patient",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM("Male", "Female"),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email_address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    appointment_status: {
      type: Sequelize.ENUM("Submitted", "InProgress", "Completed", "Canceled"),
      allowNull: true,
      defaultValue: "Submitted",
    },
    patient_status: {
      type: Sequelize.ENUM("Admit", "Discharge"),
      allowNull: true,
    },
    case: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    admission_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    doctor_incharge: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },
    discharge_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    discharge_by: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Patient;
