import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubmittedForms from "./Clerk/SubmittedForms";
import AdmitForm from "./Admit/AdmitForm";
import AppointmentForm from "./Patient/AppointmentForm";
import EditForm from "./Discharge/EditForm";
import DischargeForm from "./Discharge/DischargeForm";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AppointmentForm />} />
          <Route path="/submitted-forms" element={<SubmittedForms />} />
          <Route path="/admit/:patientId" element={<AdmitForm />} />
          <Route path="/edit/:patientId" element={<EditForm />} />
          <Route path="/discharge/:patientId" element={<DischargeForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
