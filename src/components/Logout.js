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
                "Allow-Control-Allow-Origin": process.env.REACT_APP_FRONT_URL,
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        };

        fetch(process.env.REACT_APP_API_URL + "/api/auth/logout", postRequestOptions)
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
