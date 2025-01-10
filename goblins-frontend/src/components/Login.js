import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Instructions from "./Instructions";
import { exportAnnotations } from "../api/api";
import { FiDownload } from "react-icons/fi";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim() === "") {
      alert("Please enter your name to continue.");
      return;
    }
    setUser(name); // Save the user name
    navigate("/annotate"); // Redirect to annotation page
  };

  const handleExport = async () => {
    if (adminPasscode === "admin") {
      setAdminPasscode(""); // Clear the passcode
      setShowAdminPopup(false); // Close the popup
      try {
        await exportAnnotations();
        alert("Data exported successfully!");
      } catch (error) {
        alert("Failed to export data. Please try again.");
      }
    } else {
      alert("Incorrect passcode. Please try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Vertically centers the content
        alignItems: "center", // Horizontally centers the content
        textAlign: "center",
        fontFamily: "'Quicksand', sans-serif",
        backgroundSize: "cover",
        color: "#333",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO1PDC-7QSzElGw1s4y54iZwvwOWt03HXycA&s"
        alt="Goblins Logo"
        style={{
          width: "200px",
          marginBottom: "10px",
        }}
      />
      {/* Welcome Header */}
      <h1 style={{ fontSize: "3rem", marginBottom: "10px", color: "#2c3e50" }}>
        Welcome to Goblins Math Labeler
      </h1>
      <p style={{ fontSize: "1.5rem", maxWidth: "600px", marginBottom: "20px" }}>
        Help us build the future of math education by labeling and transcribing whiteboard work. 
        Let's make learning better together!
      </p>

      {/* Instructions Component */}
      <Instructions />

      {/* Input Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px", // Add space between input and button
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1.2rem",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "1.2rem",
            backgroundColor: "#689c48",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Start
        </button>
      </div>
      <div style={{ height: "40px" }}></div>
      {/* Admin Export Button */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={() => setShowAdminPopup(true)}
          style={{
            padding: "10px",
            backgroundColor: "transparent",
            color: "#555",
            border: "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.9rem",
            width: "150px",
          }}
        >
          <FiDownload /> Export as Admin
        </button>
      </div>

      {/* Dark Overlay */}
      {showAdminPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark background
            zIndex: 999, // Ensure it's behind the popup
          }}
        ></div>
      )}

      {/* Admin Popup */}
      {showAdminPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "30px 20px", // Increased padding for better spacing
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Improved shadow for emphasis
            zIndex: 1000,
            width: "90%", // Responsive width for smaller screens
            maxWidth: "400px", // Limit max width
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "1.5rem",
              color: "#2c3e50",
              textAlign: "center",
            }}
          >
            Admin Passcode
          </h2>
          <input
            type="password"
            placeholder="Enter passcode"
            value={adminPasscode}
            onChange={(e) => setAdminPasscode(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              boxSizing: "border-box", // Consistent sizing
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px", // Better spacing between buttons
            }}
          >
            <button
              onClick={handleExport}
              style={{
                padding: "12px",
                backgroundColor: "#689c48",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                flex: 1, // Equal button widths
                fontSize: "1rem",
              }}
            >
              Export
            </button>
            <button
              onClick={() => {
                setAdminPasscode("");
                setShowAdminPopup(false);
              }}
              style={{
                padding: "12px",
                backgroundColor: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                flex: 1, // Equal button widths
                fontSize: "1rem",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
