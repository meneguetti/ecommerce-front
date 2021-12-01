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
                    "Allow-Control-Allow-Origin": "http://localhost:3000/",
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({ product_id: action.product.id }),
            };

            fetch("http://localhost/api/cart/products", postRequestOptions)
                .then((response) => response.json())
                .then((json) => json);

            return { count: state.count + 1 };
        }
        case "decrement": {
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
