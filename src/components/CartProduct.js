function CartProduct(props) {
    return (
        <div className="cart-product row no-gutters py-2" key={props.index}>
            <div className="product-image col-sm-2 p-2">
                <img
                    src={"http://localhost/images/" + props.product.thumbnail}
                    alt={props.product.name}
                />
            </div>
            <div className="cart-product-name-price col-sm-4 p-2 cart-product-vert-align">
                <div className="cart-product-name">{props.product.name}</div>
                <div className="cart-product-price">
                    {"$" +
                        props.product.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                </div>
            </div>
            <div className="cart-product-quantity col-sm-2 p-2 text-center cart-product-vert-align">
                Qty: {props.product.quantity}
            </div>
            <div className="cart-product-decrease-increase col-sm-4 p-2 row text-right cart-product-vert-align">
                <button
                    className="btn btn-danger btn-sm mr-2 mb-1"
                    /* onClick={() =>
                        dispatch({
                            product: props.product,
                            product_id: props.product.id,
                            type: "increment",
                        })
                    } */
                >
                    -
                </button>
                <button
                    className="btn btn-primary btn-sm mb-1"
                    /* onClick={() =>
                        dispatch({
                            product: props.product,
                            product_id: props.product.id,
                            type: "increment",
                        })
                    } */
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default CartProduct;
