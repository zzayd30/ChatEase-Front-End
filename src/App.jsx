import { useState, useRef, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import LoadingBar from "react-top-loading-bar";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const loadingBarRef = useRef(null);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    checkAuth().finally(() => {
      loadingBarRef.current?.complete();
    });
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingBar color="#f11946" ref={loadingBarRef} />
      </div>
    );

  return (
    <>
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
    </>
  );
}

export default App;