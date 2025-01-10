import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AnnotationPage from "./components/AnnotationPage"; // This includes Sidebar and LabelingInterface

const App = () => {
  const [user, setUser] = useState(null); // Track logged-in user

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login setUser={setUser} />} />
        
        {/* Annotation Page Route */}
        <Route
          path="/annotate"
          element={
            user ? (
              <AnnotationPage user={user} />
            ) : (
              <Navigate to="/" replace /> // Redirect to login if not authenticated
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;