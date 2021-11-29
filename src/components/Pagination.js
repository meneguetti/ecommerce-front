import React, { useEffect, useState } from "react";
import RenderProducts from "./RenderProducts";
import PaginationMui from "@mui/material/Pagination";

function Pagination() {
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    // call page of products when clicked in pagination or 1st page when first loaded
    useEffect(() => {
        fetch("http://localhost/api/products?page=" + currentPage)
            .then((response) => response.json())
            .then((json) => setData(json));
    }, [currentPage]);

    const paginationChange = (event, page) => {
        setCurrentPage(page);
    };

    if (data.data !== undefined) {
        return (
            <>
                <RenderProducts products={data.data} />
                <PaginationMui
                    count={data.last_page}
                    color="primary"
                    onChange={paginationChange}
                />
            </>
        );
    } else {
        return "";
    }
}

export default Pagination;
