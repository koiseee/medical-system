// DischargeForm.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DischargeForm.module.css";
import SuccessModal from "../Admit/SuccessModal";

const DischargeForm = () => {
  const { patientId } = useParams();
  const [dischargeData, setDischargeData] = useState({
    discharge_date: "",
    discharge_by: "",
    reason: "",
  });
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDischargeData({
      ...dischargeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3003/api/discharge/discharge-patient",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId, ...dischargeData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to discharge the patient");
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Redirect to the list of submitted forms
    navigate("/submitted-forms");
  };

  return (
    <div className={styles["edit-form-container"]}>
      <h2>Discharge Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Discharge Date:</label>
          <input
            type="date"
            name="discharge_date"
            value={dischargeData.discharge_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Discharged By:</label>
          <input
            type="text"
            name="discharge_by"
            value={dischargeData.discharge_by}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <input
            type="text"
            name="reason"
            value={dischargeData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Discharge</button>
      </form>
      {showModal && <SuccessModal onClose={closeModal} />}{" "}
      {/* Render the modal */}
    </div>
  );
};

export default DischargeForm;
