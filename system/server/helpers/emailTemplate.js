module.exports = {
  createEmailTemplate: (admission_date, doctor_incharge) => `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          p {
            color: #666;
          }
          .bold {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Admission Notification</h2>
          </div>
          <p>Dear Patient,</p>
          <p>We are pleased to inform you that you have been admitted to our hospital.</p>
          <p>Your admission date is <span class="bold">${admission_date}</span>.</p>
          <p>Your attending doctor is Dr. <span class="bold">${doctor_incharge}</span>.</p>
          <p>Please feel free to contact us if you have any questions or concerns.</p>
          <p>Regards,</p>
          <p>Hospital Team</p>
        </div>
      </body>
    </html>
  `,

  createDischargeEmailTemplate: (discharge_date, discharge_by, reason) => `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          p {
            color: #666;
          }
          .bold {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Discharge Notification</h2>
          </div>
          <p>Dear Patient,</p>
          <p>We are writing to inform you that you have been discharged from our hospital.</p>
          <p>Your discharge date is <span class="bold">${discharge_date}</span>.</p>
          <p>You were discharged by <span class="bold">${discharge_by}</span>.</p>
          <p>Reason for discharge: <span class="bold">${reason}</span>.</p>
          <p>If you have any follow-up appointments or need further assistance, please contact us.</p>
          <p>Regards,</p>
          <p>Hospital Team</p>
        </div>
      </body>
    </html>
  `,
};
