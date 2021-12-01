import { Navigate } from "react-router";
import { useEffect, useState } from "react";

function performLogout(success) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.reload();

    return <Navigate to="login" />;
}

function redirectToEcommerce() {
    return <Navigate to="ecommerce" />;
}

function Logout() {
    if (localStorage.getItem("accessToken")) {
        const postRequestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;",
                Accept: "application/json;",
                "Allow-Control-Allow-Origin": "http://localhost:3000/",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        };

        fetch("http://localhost/api/auth/logout", postRequestOptions)
            .then((response) => response.json())
            .then((json) =>
                json.success !== undefined
                    ? performLogout(json.success)
                    : redirectToEcommerce()
            );
    }

    return true;
}

export default Logout;
