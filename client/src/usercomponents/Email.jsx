// EmailStep.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Email() {
  const [localEmail, setLocalEmail] = useState("");
  const nav = useNavigate();

  const handleNext = () => {
    if (localEmail) {
        setLocalEmail(localEmail);
      nav("/signup-password");
    } else {
      console.log("Please enter an email");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="back">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
            />
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Email;
