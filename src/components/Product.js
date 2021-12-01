import { useCount } from "./CountProvider";

function Product(props) {
    const { dispatch } = useCount();

    return (
        <div className="product card card-body" key={props.index}>
            <div className="product-image">
                <img
                    src={"http://localhost/images/" + props.product.thumbnail}
                    alt={props.product.name}
                />
            </div>
            <div className="product-name">{props.product.name}</div>
            <div className="product-price">{'$' + props.product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</div>
            <div className="text-center"><button className="btn btn-primary btn-sm" onClick={() => dispatch({product: props.product, product_id: props.product.id, type: "increment" })}>Add to cart</button></div>
        </div>
    );
}

export default Product;