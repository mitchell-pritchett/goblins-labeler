import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Text, Image as KonvaImage } from "react-konva";

const LabelingInterface = ({ whiteboardUrl, rectangles, setRectangles }) => {
  const [newRect, setNewRect] = useState(null);
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

  // Load the image
  useEffect(() => {
    const img = new window.Image();
    img.src = whiteboardUrl; // Use the provided URL
    img.onload = () => setImage(img); // Set the image when it's loaded
  }, [whiteboardUrl]);

  // Mouse down: Start drawing a new rectangle
  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setNewRect({ x, y, width: 0, height: 0 });
  };

  // Mouse move: Update the dimensions of the rectangle
  const handleMouseMove = (e) => {
    if (!newRect) return;
    const { x, y } = e.target.getStage().getPointerPosition();
    setNewRect((prevRect) => ({
      ...prevRect,
      width: x - prevRect.x,
      height: y - prevRect.y,
    }));
  };

  // Mouse up: Finalize the rectangle
  const handleMouseUp = () => {
    if (newRect) {
      setRectangles([
        ...rectangles,
        { ...newRect, id: rectangles.length }, // Assign an ID to each rectangle
      ]);
      setNewRect(null);
    }
  };

  return (
    <div>
      <h2>Label the Whiteboard</h2>
      <Stage
        width={1000}
        height={800}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {/* Background Image */}
          {image && (
            <KonvaImage
              image={image}
              x={0}
              y={0}
              width={1000}
              height={800}
              ref={imageRef}
            />
          )}

          {/* Existing Rectangles with Numbers */}
          {rectangles.map((rect) => (
            <>
              <Rect
                key={rect.id}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="rgba(0, 255, 0, 0.3)"
                stroke="green"
              />
              <Text
                x={rect.x + 5} // Offset the number slightly inside the rectangle
                y={rect.y + 5}
                text={`#${rect.id + 1}`} // Number the rectangle (1-based index)
                fontSize={14}
                fill="black"
              />
            </>
          ))}

          {/* New Rectangle (during drawing) */}
          {newRect && (
            <Rect
              x={newRect.x}
              y={newRect.y}
              width={newRect.width}
              height={newRect.height}
              fill="rgba(255, 165, 0, 0.3)"
              stroke="orange"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default LabelingInterface;