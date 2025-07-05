import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://news-app-backend-sfkz.onrender.com/api/auth/login", {
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
        setMessage(data.error);
      }
    } catch {
      setMessage("Login failed. Try again.");
    }
  };

  return (
    <div className="container">
        <div className="row d-flex">
            <div className="col-md-3"></div>

            <div className="col-md-8 align-items-center d-flex  " style={{ height: "70vh" }}>
              <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input placeholder="Username" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
                <br />
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <br />
      <button className="btn btn-primary" type="submit">Login</button>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
      <p>{message}</p>
    </form>
            </div>
        </div>
    </div>
   
  );
}
