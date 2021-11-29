function Product(props) {
    return (
        <div className="product" key={props.index}>
            <div class="product-image">
                <img
                    src={"http://localhost/images/" + props.product.thumbnail}
                    alt={props.product.name}
                />
            </div>
            <div class="product-name">{props.product.name}</div>
            <div class="product-price">{'$' + props.product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</div>
            <div class="product-amount">

            </div>
        </div>
    );
}

export default Product;
