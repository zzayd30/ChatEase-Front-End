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
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useStoreTheme";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  const loadingBarRef = useRef(null);
  console.log(onlineUsers);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    checkAuth().finally(() => {
      loadingBarRef.current?.complete();
    });
  }, [checkAuth]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingBar color="#7480ff" ref={loadingBarRef} />
      </div>
    );

  return (
    <div data-theme={theme}>
      <LoadingBar color="#7480ff" ref={loadingBarRef} />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;