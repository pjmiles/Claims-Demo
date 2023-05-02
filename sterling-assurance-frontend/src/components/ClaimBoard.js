import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../notification/Tostify";
import { Claim } from "./Claim";
import api from "../api/api";
import "../styles/claimboard.css";

export const ClaimBoard = () => {
  const navigate = useNavigate();

  const [claimData, setClaimData] = useState([]);
  const [select, setSelect] = useState("PENDING");

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "ROLE_SUPER_ADMIN") {
      api
        .get("/api/vi/test-claims")
        .then((res) => {
          console.log(res.data.payload);
          setClaimData(res.data.payload);
        })
        .catch((err) => {
          console.log(err);
          notifyError(err.response.data.message);
        });
    } else {
      api
        .get("/api/vi/test-claims/user")
        .then((res) => {
          console.log(res.data.payload);
          setClaimData(res.data.payload);
        })
        .catch((err) => {
          console.log(err);
          notifyError(err.response.data.message);
        });
    }
  }, [role]);

  const handleClick = () => {
    console.log("Clicked");
  };

  const handleAddClaim = () => {
    navigate("/form");
  };

  const handleSelector = (e, claim) => {
    e.preventDefault();
    const theSelectedValule = e.target.value;
    if (select !== theSelectedValule) {
      handleUpdateStatus(theSelectedValule, claim);
    } else {
      handleUpdateStatus(theSelectedValule, claim);
    }
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  const handleUpdateStatus = (theSelectedValule, claim) => {
    api
      .post(
        `/api/vi/test-claims/${
          claim.claimNumber
        }/update-claim?claimStatus=${theSelectedValule}&adminClaimNotes=${null}`
      )
      .then((res) => {
        console.log(res.data.payload);
        window.location.reload();
        navigate("/claims");
      })
      .catch((err) => {
        console.log(err);
        notifyError(err.response.data.message);
      });
  };

  return (
    <div>
      <nav>
        <h1 className="claim__header__text">Insurance Claim Board</h1>

        <div>
          {role !== "ROLE_SUPER_ADMIN" && (
            <>
              <button className="add-claim-btn" onClick={handleAddClaim}>
                Add Claim
              </button>
            </>
          )}
          <button onClick={handleLogOut} className="logout">
            Logout
          </button>
        </div>
      </nav>
      {claimData.map((claim) => {
        return (
          <Claim
            key={claim.claimNumber}
            claim={claim}
            role={role}
            onClick={handleClick}
            handleChange={handleSelector}
            selectedValue={setSelect}
          />
        );
      })}
    </div>
  );
};
