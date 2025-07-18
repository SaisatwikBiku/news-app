import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
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
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    if (!dateOfBirth) {
      setMessage("Please enter your date of birth.");
      return false;
    }
    // Check if user is at least 13 years old
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 13) {
      setMessage("You must be at least 13 years old to sign up.");
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
        body: JSON.stringify({ username, password, email, dateOfBirth }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        navigate("/");
        window.location.reload();
      } else {
        // Show specific error for duplicate username
        if (data.error === "User already exists") {
          setMessage("Username already exists. Please choose a different username.");
        } else if (data.error === "Email already exists") {
          setMessage("Email already exists. Please use a different email address.");
        } else {
          setMessage(data.error || "Signup failed.");
        }
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
            <label className="form-label" htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              placeholder="Enter email address"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="signup-dob">Date of Birth</label>
            <input
              id="signup-dob"
              type="date"
              className="form-control"
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
              required
            />
            <div className="form-text">
              You must be at least 13 years old.
            </div>
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
