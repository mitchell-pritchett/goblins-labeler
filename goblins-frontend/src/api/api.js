import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://goblins-labeler.onrender.com/api" // Production backend
      : "http://localhost:5001/api", // Development backend
});

// Fetch images
export const fetchImages = async () => {
  const response = await api.get("/images");
  return response.data;
};

// Submit annotations
export const submitAnnotations = async (annotations) => {
  const response = await api.post("/annotations/submit", annotations);
  return response.data;
};

// Export annotations as CSV
export const exportAnnotations = async () => {
    try {
      const response = await api.get("/annotations/export", {
        responseType: "blob",
      });
  
      // Create a downloadable link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "annotations.csv"); // File name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error exporting annotations:", error);
      throw error;
    }
  };

export default api;