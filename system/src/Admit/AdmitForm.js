import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdmitForm = () => {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    admission_date: "",
    patient_case: "",
    doctor_incharge: "",
  });
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:3003/api/admit/admit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, patientId }),
      });

      if (!response.ok) {
        throw new Error("Failed to admit the patient");
      }

      const result = await response.json();
      console.log(result);

      // Redirect to the list of submitted forms
      navigate("/submitted-forms");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Admit Patient</h2>
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
        <button type="submit">Admit</button>
      </form>
    </div>
  );
};

export default AdmitForm;
