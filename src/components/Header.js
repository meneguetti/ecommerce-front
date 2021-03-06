import { Link } from "react-router-dom";
import { CartIcon } from "./Icons";
import { useCount } from "./CountProvider";

const Header = () => {
    const count = useCount().state.count;

    return (
        <header>
            <Link to="/cart">
                <CartIcon /> Cart ({count})
            </Link>
            <Link to="/logout" className="logout">
                Logout
            </Link>
        </header>
    );
};

export default Header;
