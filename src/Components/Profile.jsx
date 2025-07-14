import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    dateOfBirth: "",
    joinDate: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("https://news-app-backend-sfkz.onrender.com/api/auth/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 403) {
        // Token is invalid/expired, clear it and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        setError("Failed to fetch user information");
      }
    } catch (err) {
      setError("Error fetching user information");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://news-app-backend-sfkz.onrender.com/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password changed successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        setShowPasswordForm(false);
      } else {
        setError(data.error || "Failed to change password");
      }
    } catch (err) {
      setError("Error changing password");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Profile</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5 className="mb-3">Account Information</h5>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userInfo.username || localStorage.getItem("username")}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={userInfo.email || "Not provided"}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userInfo.dateOfBirth ? new Date(userInfo.dateOfBirth).toLocaleDateString() : "Not provided"}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Member Since</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userInfo.joinDate ? new Date(userInfo.joinDate).toLocaleDateString() : "N/A"}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="mb-3">Quick Actions</h5>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                    >
                      Change Password
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/saved")}
                    >
                      View Saved News
                    </button>
                  </div>
                </div>
              </div>

              {showPasswordForm && (
                <div className="mt-4">
                  <hr />
                  <h5 className="mb-3">Change Password</h5>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {message && (
                    <div className="alert alert-success" role="alert">
                      {message}
                    </div>
                  )}
                  <form onSubmit={handlePasswordChange}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter current password"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter new password"
                            minLength="6"
                          />
                          <div className="form-text">At least 6 characters</div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Confirm New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            placeholder="Confirm new password"
                            minLength="6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update Password"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowPasswordForm(false);
                          setPasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                          });
                          setError("");
                          setMessage("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
