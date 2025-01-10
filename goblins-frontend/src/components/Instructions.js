import React, { useState } from "react";

const Instructions = () => {
  const [showStep2Details, setShowStep2Details] = useState(false);

  const toggleStep2Details = () => {
    setShowStep2Details(!showStep2Details);
  };

  return (
    <div
      style={{
        fontSize: "1rem",
        maxWidth: "600px",
        marginBottom: "30px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p
        style={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          margin: "0 0 10px 0",
        }}
      >
        Here's how it works:
      </p>
      <ol
        style={{
          textAlign: "left",
          padding: "0 20px",
          margin: "0",
          lineHeight: "1.6",
        }}
      >
        <li>📝 Sign up with your name below to begin labeling student work.</li>

        <li>
          📋 Box and label parts of the whiteboard
          <span
            onClick={toggleStep2Details}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "#6c757d",
              textDecoration: "underline",
              fontWeight: "normal",
            }}
          >
            {showStep2Details ? "Hide How-To" : "Show How-To"}
          </span>
          {showStep2Details && (
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "rgba(240, 240, 240, 0.9)",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <p
                style={{
                  margin: "0", // Remove top and bottom margin
                  fontWeight: "bold",
                }}
              >
                Follow these steps to box and label:
              </p>
              <ol
                style={{
                  marginLeft: "20px",
                  lineHeight: "1.6",
                  listStyleType: "decimal",
                }}
              >
                <li>
                  <strong>Draw Boxes:</strong> Use your cursor to draw boxes
                  around:
                  <ul
                    style={{
                      marginLeft: "20px",
                      listStyleType: "circle",
                      margin: "5px 0",
                    }}
                  >
                    <li>Equations (e.g., <code>y = mx + b</code>).</li>
                    <li>Diagrams or charts representing concepts.</li>
                    <li>Symbols or unclear handwriting.</li>
                  </ul>
                </li>
                <li>
                  <strong>Label Each Box:</strong>
                  <ul
                    style={{
                      marginLeft: "20px",
                      listStyleType: "circle",
                      margin: "5px 0",
                    }}
                  >
                    <li>
                      <strong>Transcription:</strong> Write exactly what you see in the box.
                    </li>
                    <li>
                      <strong>Confidence Level:</strong>
                      <ul
                        style={{
                          marginLeft: "20px",
                          listStyleType: "disc",
                          margin: "5px 0",
                        }}
                      >
                        <li>
                          <strong>High:</strong> Clearly written and easy to transcribe.
                        </li>
                        <li>
                          <strong>Medium:</strong> Somewhat unclear but guessable (e.g.,
                          "Is this a 3?").
                        </li>
                        <li>
                          <strong>Low:</strong> Unreadable or illegible.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Review Your Work:</strong> Make sure all important
                  elements are boxed and labeled before moving to the next step.
                </li>
              </ol>
            </div>
          )}
        </li>

        <li>🎯 Submit and load the next whiteboard when done labeling!</li>
      </ol>
    </div>
  );
};

export default Instructions;