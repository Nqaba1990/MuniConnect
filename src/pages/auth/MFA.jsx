import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth.css";

import logo from "../../assets/municonnect-logo.png";

function MFA() {
  const navigate = useNavigate();
  const { verifyMFA } = useAuth();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const success = verifyMFA(code);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid verification code.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card mfa-card">

        <div className="auth-logo">
          <img src={logo} alt="MuniConnect" />
        </div>

        <div className="mfa-icon">
          <ShieldCheck size={42} />
        </div>

        <div className="auth-heading">
          <h1>MFA Verification</h1>

          <p>
            Enter the six-digit verification code
            sent to your registered device.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Verification Code</label>

            <input
              className="mfa-input"
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="000000"
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button type="submit" className="auth-button">
            <ShieldCheck size={20} />
            Verify & Continue
          </button>

        </form>

        <button
          className="back-login"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>

        <div className="powered-by">
          Powered by MuniConnect
        </div>

      </div>
    </div>
  );
}

export default MFA;