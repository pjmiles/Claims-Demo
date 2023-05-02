import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import { notify, notifyError, notifySuccess } from "../notification/Tostify";
import moment from "moment";
import api from "../api/api";
import "../styles/formpage.css";

export const FormPage = () => {
  const navigate = useNavigate();

  const [claimDetails, setClaimDetails] = useState({
    policyNumber: "",
    email: "",
    vehicleId: "",
    description: "",
    dateOfClaim: "",
    files: [],
  });

  const handleChanges = (e) => {
    e.preventDefault();
    setClaimDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangesDate = (e) => {
    e.preventDefault();
    setClaimDetails((prev) => ({
      ...prev,
      [e.target.name]:
        moment(e.target.value, "YYYY-MM-DD").format("DD-MM-YYYY") + " 00:00",
    }));
  };

  const displayLoginNotification = () => {
    toast.success("Successful");
  };

  const claimInsurance = () => {
    api
      .post("/api/vi/test-claims/file", claimDetails)
      .then((res) => {
        console.log(res.data.payload);
        navigate("/claims");
      })
      .catch((err) => {
        console.log(err);
        notifyError(err.response.data.message);
        displayLoginNotification();
      });
  };

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(claimDetails);
    claimInsurance(claimDetails);
    console.log(claimDetails.dateOfClaim);
  };

  return (
    <div className="assurance-body">
      <h1 className="header-1">Motor insurance Claim</h1>
      <hr />
      <ToastContainer />
      <h2 className="header-2">Policy Owner Details</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="policy Number">
            {" "}
            Policy Number
            <input
              className="form-input"
              type="number"
              value={claimDetails.policyNumber}
              id="policy-number"
              name="policyNumber"
              onChange={handleChanges}
            />
          </label>

          <div className="name-section">
            {/* <div className="firstname">
              <label htmlFor="first_name">
                {" "}
                First Name
                <input
                  className="form-input"
                  type="text"
                  value={claimDetails.firstName}
                  id="first_name"
                  name="firstName"
                  onChange={handleChanges}
                />
              </label>
            </div> */}
            {/* <div className="lastname">
              <label htmlFor="last_name">
                {" "}
                Last Name
                <input
                  className="form-input"
                  type="text"
                  value={claimDetails.lastName}
                  id="last_name"
                  name="lastName"
                  onChange={handleChanges}
                />
              </label>
            </div> */}
          </div>
          {/* 
          <label htmlFor="phone_number">
            {" "}
            Phone Number
            <input
              className="form-input"
              type="number"
              value={claimDetails.phoneNumber}
              id="phone_number"
              name="phoneNumber"
              onChange={handleChanges}
            />
          </label> */}

          <label htmlFor="email_address">
            {" "}
            Email Address
            <input
              className="form-input"
              type="email"
              value={claimDetails.email}
              id="email_address"
              name="email"
              onChange={handleChanges}
            />
          </label>

          <label htmlFor="vehicle_number">
            {" "}
            Vehicle Number
            <input
              className="form-input"
              type="text"
              value={claimDetails.vehicleId}
              id="vehicleId"
              name="vehicleId"
              onChange={handleChanges}
            />
          </label>
        </fieldset>

        <hr className="divider" />

        <fieldset>
          <label htmlFor="date_of_incident">
            {" "}
            Date of Incident
            <input
              className="form-input"
              type="date"
              name="dateOfClaim"
              placeholder=""
              onChange={handleChangesDate}
            />
          </label>

          <label htmlFor="incident_location">
            Where Did The Incident Happen
            <input
              className="form-input"
              type="text"
              id="incident_location"
              name="Where Did The Incident Happen"
              onChange={handleChanges}
            />
          </label>

          <label>Brief Details of Incident</label>

          <textarea
            className="incident_details mr-30"
            rows="6"
            cols="100"
            name="description"
            value={claimDetails.description}
            onChange={handleChanges}
          ></textarea>

          <div>
            <label htmlFor="file_upload" className="upload_label">
              {" "}
              Add Evidence
            </label>
            <input
              className="file_upload"
              type="file"
              value={claimDetails.files}
              name="files"
              onChange={handleChanges}
            />
          </div>
        </fieldset>

        <hr className="divider" />

        <button className="submit_button">Submit</button>
      </form>
    </div>
  );
};
