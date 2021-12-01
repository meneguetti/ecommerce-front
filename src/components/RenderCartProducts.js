import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";

function render(props) {
    if (props.products.length === 0) {
        return (
            <>
                <div className="text-center">
                    <div className="checkout-successfull-message">
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <div class="empty-cart">Empty Cart!</div>
                                <p className="lead">
                                    <Link to="/ecommerce">Buy now</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="cart-products-wrapper justify-content-center row no-gutters py-2">
                    <div className="cart-products col-sm-9 p-3">
                        {props.products.map((product, index) => {
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
                                {props.total_quantity}
                            </div>
                        </div>
                        <div className="checkout-total-price checkout-items-spacing">
                            <div className="checkout-total-price-label">
                                Total Price
                            </div>
                            <div className="checkout-total-price-value">
                                {"$" +
                                    props.total_price.toLocaleString(
                                        undefined,
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }
                                    )}
                            </div>
                        </div>
                        <div className="checkout text-center checkout-items-spacing">
                            <Link
                                to="/checkout"
                                className="btn btn-primary btn-sm"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function RenderCartProducts(props) {
    return (
        <>
            <div className="cart-container">
                <h1>My Cart</h1>
                <div className="container">{render(props.products)}</div>
            </div>
        </>
    );
}

export default RenderCartProducts;
