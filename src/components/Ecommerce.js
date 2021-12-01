import "./../App.css";
import React, { useEffect, useState } from "react";
import RenderProducts from "./RenderProducts";
import PaginationMui from "@mui/material/Pagination";
import Header from "./Header";
import { CountProvider } from "./CountProvider";
import { useNavigate } from "react-router";

function Ecommerce() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(-1);
    let navigate = useNavigate();

    // call page of products when clicked in pagination or 1st page when first loaded
    useEffect(() => {
        // get paginated products
        fetch(process.env.REACT_APP_API_URL + "/api/products?page=" + currentPage)
            .then((response) => response.json())
            .then((json) => setData(json));

        // get cart products
        fetch(process.env.REACT_APP_API_URL + "/api/cart/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json;",
                Accept: "application/json;",
                "Allow-Control-Allow-Origin": process.env.REACT_APP_FRONT_URL,
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        })
            .then((response) => response.json())
            .then((json) =>
                json.message !== "Unauthenticated."
                    ? setCount(json.total_quantity)
                    : navigate("/logout")
            );
    }, [currentPage]);

    const paginationChange = (event, page) => {
        setCurrentPage(page);
    };

    if (data.data !== undefined && count > -1) {
        return (
            <>
                <div className="App">
                    <CountProvider initialCount={count}>
                        <Header />
                        <header className="App-header">
                            <RenderProducts products={data.data} />
                            <PaginationMui
                                count={data.last_page}
                                color="primary"
                                onChange={paginationChange}
                            />
                        </header>
                    </CountProvider>
                </div>
            </>
        );
    } else {
        return "";
    }
}

export default Ecommerce;
