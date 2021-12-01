import "./App.css";

import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Ecommerce from "./components/Ecommerce";
import Cart from "./components/Cart";
import * as React from "react";

export default function App() {
    const token = localStorage.getItem("accessToken");

    var path = useLocation().pathname;

    if (!token) {
        // paths to login
        if (path !== "/signup" && path !== "/") {
            return <Navigate to="/" />;
        }
    } else {
        // logged in
        if (path !== "/ecommerce" && path !== "/cart") {
            return <Navigate to="/ecommerce" />;
        }
    }

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
}
