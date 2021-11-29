import Product from "./Product";

function RenderProducts(props) {
    return (
        <>
            <h1>Products</h1> <br />
            <div className="products">
                {props.products.map((product, index) => {
                    return <Product product={product} key={index} />;
                })}
            </div>
        </>
    );
}

export default RenderProducts;
