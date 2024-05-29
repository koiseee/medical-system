// SuccessModal.js

import React from "react";
import styles from "./SuccessModal.module.css";

const SuccessModal = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Success!</h2>
        <p>Your submission was successful.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;
