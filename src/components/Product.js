function Product(props) {
    return (
        <div className="product" key={props.index}>
            <div className="product-image">
                <img
                    src={"http://localhost/images/" + props.product.thumbnail}
                    alt={props.product.name}
                />
            </div>
            <div className="product-name">{props.product.name}</div>
            <div className="product-price">{'$' + props.product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</div>
            <div className="product-amount">

            </div>
        </div>
    );
}

export default Product;