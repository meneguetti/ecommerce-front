import { useReducer, useContext, createContext } from "react";

const CountContext = createContext();

function countReducer(state, action) {
    switch (action.type) {
        case "increment": {
            const postRequestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;",
                    Accept: "application/json;",
                    "Allow-Control-Allow-Origin": process.env.REACT_APP_FRONT_URL,
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({ product_id: action.product_id }),
            };

            fetch(process.env.REACT_APP_API_URL + "/api/cart/products", postRequestOptions)
                .then((response) => response.json())
                .then((json) => action.place === "cart" ? window.location.reload() : json );

            return { count: state.count + 1 };
        }
        case "decrement": {
            const postRequestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;",
                    Accept: "application/json;",
                    "Allow-Control-Allow-Origin": process.env.REACT_APP_FRONT_URL,
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            };

            fetch(
                process.env.REACT_APP_API_URL + "/api/cart/products/" + action.product_id,
                postRequestOptions
            )
                .then((response) => response.json())
                .then((json) => action.place === "cart" ? window.location.reload() : json );

            return { count: state.count - 1 };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function CountProvider(props) {
    const [state, dispatch] = useReducer(countReducer, {
        count: props.initialCount,
    });
    const value = { state, dispatch };
    return (
        <CountContext.Provider value={value}>
            {props.children}
        </CountContext.Provider>
    );
}

function useCount() {
    const context = useContext(CountContext);
    if (context === undefined) {
        throw new Error("useCount must be used within a CountProvider");
    }
    return context;
}

export { CountProvider, useCount };
