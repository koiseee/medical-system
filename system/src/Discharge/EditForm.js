import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditForm.module.css";
import SuccessModal from "../Admit/SuccessModal";

const EditForm = () => {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    admission_date: "",
    patient_case: "",
    doctor_incharge: "",
  });
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3003/api/find/${patientId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch form data");
      }
      const data = await response.json();
      setFormData({
        admission_date: data.user.admission_date,
        patient_case: data.user.patient_case,
        doctor_incharge: data.user.doctor_incharge,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/api/admit/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId, ...formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the form");
      }

      // Redirect to the list of submitted forms
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
      <h2>Edit Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Admission Date:</label>
          <input
            type="date"
            name="admission_date"
            value={formData.admission_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Case:</label>
          <input
            type="text"
            name="patient_case"
            value={formData.patient_case}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Doctor In Charge:</label>
          <input
            type="text"
            name="doctor_incharge"
            value={formData.doctor_incharge}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {showModal && <SuccessModal onClose={closeModal} />}{" "}
      {/* Render the modal */}
    </div>
  );
};

export default EditForm;
