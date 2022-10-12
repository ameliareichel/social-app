import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = () => {

    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li>
                    <Link className="nav-list-item" to="/">Home</Link>
                </li>
                <li>
                    <Link className="nav-list-item" to="/login">Log in</Link>
                </li>
                <li>
                    <Link className="nav-list-item" to="/signup">Sign up</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;