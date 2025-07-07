import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const validateForm = () => {
    if (
      !/^[a-zA-Z][a-zA-Z0-9]{1,}$/.test(username) ||
      username.length < 3
    ) {
      window.alert(
        "Username must be at least 3 characters, start with a letter, and contain only letters and numbers."
      );
      return false;
    }
    if (password.length < 6) {
      window.alert("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("https://news-app-backend-sfkz.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
        window.location.reload();
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="container">
        <div className="row d-flex">
            <div className="col-md-3"></div>

            <div className="col-md-8 align-items-center d-flex  " style={{ height: "70vh" }}>
              <form onSubmit={handleSignup}>
                <h2>Signup</h2>
                <input placeholder="Username" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
                <br />
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <br />
                <button className="btn btn-primary" type="submit">Sign Up</button>
                <p>Already have an account? <a href="/login">Login</a></p>
                <p style={{color: "red"}}>{message}</p>
              </form>
            </div>
        </div>
    </div>
  );
}
