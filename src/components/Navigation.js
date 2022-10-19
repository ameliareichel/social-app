import { Link } from "react-router-dom";
import './Navigation.css';
import axios from "axios";

const Navigation = (props) => {

    const logoutFunction = (event) => {
        event.preventDefault();

        axios.post('https://akademia108.pl/api/social-app/user/logout')
            .then(res => {

                if (res.data.message) {
                    props.setUser(null);
                    localStorage.setItem('user', null);
                };
            })
            .catch((error) => {
                props.setUser(null);
                localStorage.setItem('user', null);
                console.error(error);
            });
    };

    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li>
                    <Link className="nav-list-item" to="/">Home</Link>
                </li>
                {!props.user &&
                    <li>
                        <Link className="nav-list-item" to="/login">Log in</Link>
                    </li>}
                {!props.user &&
                    <li>
                        <Link className="nav-list-item" to="/signup">Sign up</Link>
                    </li>}
                {props.user &&
                    <li>
                        <Link className="nav-list-item" to="/" onClick={logoutFunction}>Log Out</Link>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Navigation;