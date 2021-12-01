import { useEffect, useState } from "react";
import RenderCartProducts from "./RenderCartProducts";
import { Link } from "react-router-dom";
import { CountProvider } from "./CountProvider";

function Cart() {
    const [products, setProducts] = useState();

    useEffect(() => {
        // get cart products
        fetch("http://localhost/api/cart/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json;",
                Accept: "application/json;",
                "Allow-Control-Allow-Origin": "http://localhost:3000/",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        })
            .then((response) => response.json())
            .then((json) => setProducts(json));
    }, []);

    if (products !== undefined) {
        return (
            <>
                <div className="App">
                    <CountProvider initialCount={0}>
                        <header>
                            <Link to="/ecommerce">Shop</Link>
                            <Link to="/logout" className="logout">
                                Logout
                            </Link>
                        </header>
                        <div className="cart-products">
                            <RenderCartProducts products={products} />
                        </div>
                    </CountProvider>
                </div>
            </>
        );
    } else {
        return "";
    }
}

export default Cart;
