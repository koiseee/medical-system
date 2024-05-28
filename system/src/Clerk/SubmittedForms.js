// SubmittedForms.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SubmittedForms.module.css"; // Import CSS module

const SubmittedForms = () => {
  const [forms, setForms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, [searchQuery, filterStatus]);

  const fetchForms = async () => {
    try {
      let url = "http://localhost:3003/api/find/find-all";
      if (filterStatus === "Submitted") {
        url = "http://localhost:3003/api/find/find-submit";
      } else if (filterStatus === "InProgress") {
        url = "http://localhost:3003/api/find/find-inprogress";
      } else if (filterStatus === "Completed") {
        url = "http://localhost:3003/api/find/find-complete";
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch forms");
      }
      const data = await response.json();
      setForms(data.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredForms = forms.filter((form) => {
    if (!searchQuery) {
      return true; // If no search query, include all forms
    }
    // Perform search based on specific criteria (e.g., form name, ID, etc.)
    return (
      form.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAdmit = (patientId) => {
    navigate(`/admit/${patientId}`);
  };

  const handleCancel = async (id) => {
    try {
      const response = await fetch("http://localhost:3003/api/admit/cancel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId: id }),
      });
      if (!response.ok) {
        throw new Error("Failed to cancel form");
      }
      // Refresh forms after cancelling
      fetchForms();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (patientId) => {
    navigate(`/edit/${patientId}`);
  };

  const handleDischarge = (patientId) => {
    navigate(`/discharge/${patientId}`);
  };

  return (
    <div className={styles["submitted-forms-container"]}>
      <h2>Submitted Forms</h2>
      <div className={styles["form-controls"]}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Submitted">Submitted</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <ul>
        {filteredForms.map((form) => (
          <li key={form.id}>
            <strong>
              Name: {form.firstname} {form.lastname}
            </strong>
            <p>Birthday: {form.birthday}</p>
            <p>Gender: {form.gender}</p>
            <p>Address: {form.address}</p>
            <p>Phone Number: {form.phone_number}</p>
            <p>Notes: {form.notes}</p>
            {filterStatus === "Submitted" && (
              <div>
                <button onClick={() => handleAdmit(form.id)}>Admit</button>
                <button onClick={() => handleCancel(form.id)}>Cancel</button>
              </div>
            )}
            {filterStatus === "InProgress" && (
              <div>
                <button onClick={() => handleEdit(form.id)}>Edit</button>
                <button onClick={() => handleDischarge(form.id)}>
                  Discharge
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedForms;
