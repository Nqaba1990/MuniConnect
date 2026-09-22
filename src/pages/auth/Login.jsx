import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/municonnect-logo.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const success = login(email, password);

    if (success) {
      navigate("/mfa");
    } else {
      setError("Invalid login details.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          <img src={logo} alt="MuniConnect" />
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1>Welcome to MuniConnect</h1>
          <p>Community Services Platform</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <div className="input-wrapper">
              <Mail size={20} />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrapper">
              <Lock size={20} />

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {/* Forgot password */}
          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="auth-button"
          >
            <LogIn size={20} />
            Login
          </button>

        </form>

        {/* Registration */}
        <div className="auth-footer">
          <p>Don't have an account?</p>

          <Link to="/register">
            Create Community Account
          </Link>
        </div>

        {/* Footer */}
        <div className="powered-by">
          Powered by MuniConnect
        </div>

      </div>
    </div>
  );
}

export default Login;