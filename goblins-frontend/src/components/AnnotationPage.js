import React, { useState, useEffect } from "react";
import LabelingInterface from "./LabelingInterface";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { fetchImages, submitAnnotations } from "../api/api";

const AnnotationPage = ({ user }) => {
  const [rectangles, setRectangles] = useState([]);
  const [imageQueue, setImageQueue] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await fetchImages();
        setImageQueue(images);
        if (images.length > 0) setCurrentImage(images[0]);
      } catch (error) {
        console.error("Error fetching images:", error);
        alert("Failed to load images. Please try again later.");
      }
    };
    loadImages();
  }, []);

  const updateRectangle = (id, updatedRect) => {
    const updatedRectangles = rectangles.map((rect) =>
      rect.id === id ? updatedRect : rect
    );
    setRectangles(updatedRectangles);
  };

  const deleteRectangle = (id) => {
    const filteredRectangles = rectangles.filter((rect) => rect.id !== id);
    const reIndexedRectangles = filteredRectangles.map((rect, index) => ({
      ...rect,
      id: index,
    }));
    setRectangles(reIndexedRectangles);
  };

  const handleSubmit = async (annotations) => {
    try {
      const payload = {
        id: currentImage.id,
        rectangles: annotations,
        submittedBy: user,
        submittedAt: new Date().toISOString(),
      };
      await submitAnnotations(payload);
      alert("Annotations submitted successfully!");

      const nextQueue = imageQueue.slice(1); // Move to next image
      setImageQueue(nextQueue);
      setCurrentImage(nextQueue.length > 0 ? nextQueue[0] : null);
      setRectangles([]);
    } catch (error) {
      console.error("Error submitting annotations:", error);
      alert("Failed to submit annotations. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#f7f7f7",
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")} // Navigate to login page on click
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer", // Add cursor pointer for clickability
          }}
        >
          <img
            src="https://framerusercontent.com/images/rnW1Q2GsGTt3hyXFkTM7ooGFa2w.png?scale-down-to=512"
            alt="Logo"
            style={{ width: "100px", marginRight: "10px" }}
          />
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#2c3e50" }}>
            Goblins Math Labeler
          </h2>
        </div>
        {/* User Info */}
        <div style={{ fontSize: "1rem", color: "#333" }}>
          Labeler ID: <strong>{user}</strong>
        </div>
      </header>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Labeling Interface */}
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentImage ? (
            <LabelingInterface
              whiteboardUrl={currentImage.image_url} // Use the image URL for the interface
              rectangles={rectangles}
              setRectangles={setRectangles}
            />
          ) : (
            <p style={{ fontSize: "1.2rem", color: "#888" }}>
              No images available for annotation.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ flex: "0 0 300px" }}>
          <Sidebar
            rectangles={rectangles}
            onUpdateRectangle={updateRectangle}
            onDeleteRectangle={deleteRectangle}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AnnotationPage;
