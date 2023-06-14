import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import App from "./App.js";
import Login from "./pages/Login.js";
import Palindromos from "./pages/Palindromos.js";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/App" element={<App />} />
                <Route path="/Palindromos" element={<Palindromos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
