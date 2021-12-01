import CartProduct from "./CartProduct";

function RenderCartProducts(props) {
    return (
        <>
            <h1>My Cart</h1> 
            <div className="container">
                <div className="cart-products-wrapper justify-content-center row no-gutters py-2">
                    <div className="cart-products col-sm-9 p-3">
                        {props.products.products.map((product, index) => {
                            return (
                                <CartProduct product={product} key={index} />
                            );
                        })}
                    </div>
                    <div className="checkout-wrapper col-sm-3 p-3">
                        <div className="checkout-total-items checkout-items-spacing">
                            <div className="checkout-total-items-label">
                                Total Items
                            </div>
                            <div className="checkout-total-items-value">
                                {props.products.total_quantity}
                            </div>
                        </div>
                        <div className="checkout-total-price checkout-items-spacing">
                            <div className="checkout-total-price-label">
                                Total Price
                            </div>
                            <div className="checkout-total-price-value">
                                {"$" +
                                    props.products.total_price.toLocaleString(
                                        undefined,
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }
                                    )}
                            </div>
                        </div>
                        <div className="checkout text-center checkout-items-spacing">
                            <button
                                className="btn btn-primary btn-sm"
                                /* onClick={() =>
                        dispatch({
                            product: props.product,
                            product_id: props.product.id,
                            type: "increment",
                        })
                    } */
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RenderCartProducts;
