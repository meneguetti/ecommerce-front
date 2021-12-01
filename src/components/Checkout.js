import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function renderCheckout(data) {
    if (!data.success) {
        return (
            <>
                <div className="text-center">
                    <div className="checkout-successfull-message">
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <div>Some error occurred!</div>
                                <p className="lead">{data.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="text-center">
                    <div className="checkout-successfull-message">
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <h1 className="display-4">
                                    Checkout Successful
                                </h1>
                                <p className="lead">
                                    <span className="envelope-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            className="bi bi-envelope"
                                            viewBox="0 -5 12 20"
                                        >
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                        </svg>
                                    </span>
                                    Email sent with the purchase details!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function Checkout() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const postRequestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;",
                Accept: "application/json;",
                "Allow-Control-Allow-Origin": process.env.REACT_APP_FRONT_URL,
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ checkout: true }),
        };

        fetch(process.env.REACT_APP_API_URL + "/api/cart/checkout", postRequestOptions)
            .then((response) => response.json())
            .then((json) => setMessage(renderCheckout(json)));
    }, []);

    return (
        <>
            <div className="App">
                <header>
                    <Link to="/ecommerce">Shop</Link>
                    <Link to="/logout" className="logout">
                        Logout
                    </Link>
                </header>
                <div className="checkout-page">{message}</div>
            </div>
        </>
    );
}

export default Checkout;
