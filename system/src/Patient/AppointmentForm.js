// AppointmentForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AppointmentForm.module.css"; // Import CSS module

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    gender: "",
    address: "",
    phone_number: "",
    notes: "",
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
      const response = await fetch(
        "http://localhost:3003/api/admit/send-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form");
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
    <div className={styles["appointment-form-container"]}> {/* Use className from CSS module */}
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}> {/* Use className from CSS module */}
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}> {/* Use className from CSS module */}
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}> {/* Use className from CSS module */}
          <label>Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}> {/* Use className from CSS module */}
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className={styles["form-group"]}> {/* Use className from CSS module */}
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}> {/* Use className from CSS module */}
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}> {/* Use className from CSS module */}
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
