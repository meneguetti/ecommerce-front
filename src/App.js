import "./App.css";

import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Ecommerce from "./components/Ecommerce";
import Cart from "./components/Cart";
import Logout from "./components/Logout";
import Checkout from "./components/Checkout";

import * as React from "react";

export default function App() {
    const token = localStorage.getItem("accessToken");
    var path = useLocation().pathname;
    console.log(process.env.REACT_APP_API_URL);

    if (!token) {
        // guest
        if (path !== "/signup" && path !== "/") {
            return <Navigate to="/" />;
        }
    } else {
        // user (logged in)
        if (
            path !== "/ecommerce" &&
            path !== "/cart" &&
            path !== "/logout" &&
            path !== "/checkout"
        ) {
            return <Navigate to="/ecommerce" />;
        }
    }

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    );
}
