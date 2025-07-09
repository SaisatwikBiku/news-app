import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !/^[a-zA-Z][a-zA-Z0-9]{1,}$/.test(username) ||
      username.length < 3
    ) {
      setMessage(
        "Username must be at least 3 characters, start with a letter, and contain only letters and numbers."
      );
      return false;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return false;
    }
    setMessage("");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("https://news-app-backend-sfkz.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        navigate("/");
        window.location.reload();
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch {
      setMessage("Signup failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Create Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label" htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              placeholder="Enter username"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="form-text">
              At least 6 characters.
            </div>
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="text-center mt-3">
            <span>Already have an account? <a href="/login">Login</a></span>
          </div>
          {message && (
            <div className="alert alert-danger mt-3 py-2 text-center" role="alert" style={{ fontSize: "0.95rem" }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
