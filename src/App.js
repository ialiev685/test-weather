import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
//provider
import { AuthContext } from "./provider";
//components
import { GuestLayout } from "./components/GuestLayout";
import { SignUp, SignIn, Home } from "./views";

//style
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <GuestLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout>
      <Routes>
        <Route path="/" element={<Navigate to="signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="signup" />} />
      </Routes>
    </GuestLayout>
  );
}

export default App;
