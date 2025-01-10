import React, { useState } from "react";

const Sidebar = ({ rectangles, onUpdateRectangle, onDeleteRectangle, onSubmit }) => {
  const [selectedRect, setSelectedRect] = useState(null);

  const handleSelect = (id) => {
    setSelectedRect(id);
  };

  const handleChange = (field, value) => {
    const updatedRectangle = {
      ...rectangles[selectedRect],
      [field]: value,
    };
    onUpdateRectangle(selectedRect, updatedRectangle);
  };

  const handleDelete = () => {
    if (selectedRect !== null) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete Box #${selectedRect + 1}?`
      );
      if (confirmDelete) {
        onDeleteRectangle(selectedRect);
        setSelectedRect(null); // Clear selection after deletion
      }
    }
  };

  const handleSubmit = () => {
    if (rectangles.length === 0) {
      alert("No annotations to submit!");
      return;
    }

    const annotations = rectangles.map((rect) => ({
      id: rect.id,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      transcription: rect.transcription || "N/A",
      confidence: rect.confidence || "medium",
    }));

    const confirmSubmit = window.confirm(
      "Are you sure you want to submit this annotation?"
    );

    if (confirmSubmit) {
      onSubmit(annotations); // Trigger parent submission logic
      setSelectedRect(null); // Clear selection after submission
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Ensures the bottom section (buttons) stays at the bottom
        width: "300px",
        height: "90vh", // Full height of the viewport
        padding: "20px",
        background: "#f7f7f7",
        borderRadius: "10px 0 0 10px",
        overflowY: "auto", // Enable scrolling for overflow content
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <div style={{ flex: "1", overflowY: "auto", marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px", color: "#2c3e50", fontSize: "1.5rem" }}>
          Label Details
        </h3>
        <p style={{ fontSize: "1rem", marginBottom: "20px", color: "#333" }}>
          Total Boxes: <strong>{rectangles.length}</strong>
        </p>
        <div style={{ marginBottom: "20px" }}>
          {rectangles.map((rect) => (
            <div
              key={rect.id}
              onClick={() => handleSelect(rect.id)}
              style={{
                padding: "10px",
                marginBottom: "10px",
                background: selectedRect === rect.id ? "#dff5e3" : "#ffffff",
                borderRadius: "8px",
                cursor: "pointer",
                border: "1px solid #ddd",
                boxShadow:
                  selectedRect === rect.id ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                transition: "background 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              #{rect.id + 1}
            </div>
          ))}
        </div>
  
        {selectedRect !== null && (
          <div
    style={{
      background: "white",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      overflow: "hidden", // Ensure no overflow
    }}
  >
    <h4 style={{ marginBottom: "10px", color: "#2c3e50" }}>
      Box #{selectedRect + 1}
    </h4>
    <label style={{ display: "block", marginBottom: "10px", color: "#333" }}>
      Transcription:
      <input
        type="text"
        value={rectangles[selectedRect]?.transcription || ""}
        onChange={(e) => handleChange("transcription", e.target.value)}
        style={{
          width: "100%", // Ensure it does not exceed the parent container
          maxWidth: "100%", // Restrict maximum width
          padding: "10px",
          marginTop: "5px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxSizing: "border-box", // Includes padding and border in width
        }}
      />
    </label>
    <label style={{ display: "block", marginBottom: "10px", color: "#333" }}>
      Confidence:
      <select
        value={rectangles[selectedRect]?.confidence || "high"}
        onChange={(e) => handleChange("confidence", e.target.value)}
        style={{
          width: "100%", // Match the input field width
          padding: "10px",
          marginTop: "5px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxSizing: "border-box", // Includes padding and border in width
        }}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </label>
    <button
      onClick={handleDelete}
      style={{
        background: "red",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        width: "100%", // Full-width button
        marginTop: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      Delete Box
    </button>
          </div>
        )}

      </div>
  
      {/* Buttons */}
      <div>
        <button
          onClick={handleSubmit}
          style={{
            background: "#689c48",
            color: "white",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            marginBottom: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          disabled={rectangles.length === 0}
        >
          Submit and Load Next
        </button>
      </div>
    </div>
  );
  
};

export default Sidebar;