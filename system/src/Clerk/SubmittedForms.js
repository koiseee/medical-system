import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import styles from "./SubmittedForms.module.css"; // Import CSS module

Modal.setAppElement('#root'); // Bind modal to the root element

const SubmittedForms = () => {
  const [forms, setForms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedForm, setSelectedForm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3003/api/discharge/delete-complete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId: id }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete form");
      }
      // Refresh forms after deleting
      fetchForms();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleView = (form) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null);
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
          className={styles["search-input"]}
        />
        <select value={filterStatus} onChange={handleFilterChange} className={styles["filter-select"]}>
          <option value="">All</option>
          <option value="Submitted">Submitted</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {filteredForms.length === 0 ? (
        <p className={styles["empty-message"]}>Empty</p>
      ) : (
        <ul className={styles["forms-list"]}>
          {filteredForms.map((form) => (
            <li key={form.id} className={styles["form-item"]}>
              <div className={styles["form-details"]}>
                <strong>
                  Name: {form.firstname} {form.lastname}
                </strong>
              </div>
              <div className={styles["form-actions"]}>
                <button onClick={() => handleView(form)} className={styles["action-button"]}>View</button>
                {filterStatus === "Submitted" && (
                  <div>
                    <button onClick={() => handleAdmit(form.id)} className={styles["action-button"]}>Admit</button>
                    <button onClick={() => handleCancel(form.id)} className={styles["action-button"]}>Cancel</button>
                  </div>
                )}
                {filterStatus === "InProgress" && (
                  <div>
                    <button onClick={() => handleEdit(form.id)} className={styles["action-button"]}>Edit</button>
                    <button onClick={() => handleDischarge(form.id)} className={styles["action-button"]}>Discharge</button>
                  </div>
                )}
                {filterStatus === "Completed" && (
                  <div>
                    <button onClick={() => handleDelete(form.id)} className={styles["action-button"]}>Delete</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Form Details"
        className={styles["modal"]}
        overlayClassName={styles["overlay"]}
      >
        {selectedForm && (
          <div>
            <h2>Form Details</h2>
            <p><strong>Name:</strong> {selectedForm.firstname} {selectedForm.lastname}</p>
            <p><strong>Birthday:</strong> {selectedForm.birthday}</p>
            <p><strong>Gender:</strong> {selectedForm.gender}</p>
            <p><strong>Address:</strong> {selectedForm.address}</p>
            <p><strong>Phone Number:</strong> {selectedForm.phone_number}</p>
            <p><strong>Notes:</strong> {selectedForm.notes}</p>
            <button onClick={closeModal} className={styles["close-button"]}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubmittedForms;
