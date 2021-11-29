import React, { useEffect, useState } from "react";
import Product from "./Product.js";

const renderData = (data) => {
    if(data === undefined) return "";

    return (
        <div className="products">
            {data.map((product, index) => {
                return <Product product={product} index={index} />;
            })}
        </div>
    );
};

function Pagination() {
    const [data, setData] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);

    useEffect(() => {
        fetch("http://localhost/api/products?page=" + currentPage)
            .then((response) => response.json())
            .then((json) => setData(json));
    }, [currentPage]);

    return (
        <>
            <h1>Products</h1> <br />
            {renderData(data.data)}
        </>
    );
}

export default Pagination;
