import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


import App from "./App.js";
import Login from "./pages/Login.js";
import Palindromos from "./pages/Palindromos.js";
import RecoveryPass from "./pages/RecoveryPass.js";
import NewPassword from "./pages/NewPassword.js";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/App" element={<App />} />
                <Route path="/Palindromos" element={<Palindromos />} />
                <Route path="/RecoveryPass" element={<RecoveryPass />} />
                <Route path="/NewPassword" element={<NewPassword />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
