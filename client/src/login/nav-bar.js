import { Link } from "react-router-dom";

export default function NavBar(props) {
    return (
        <>
            <div className="navbar-container">
                <ul className="breadcrumb">
                    <li>
                        <Link to="/find/user">Find People</Link>
                    </li>
                    <li>
                        <Link to="/">My Profile</Link>
                    </li>
                    <li>
                        <a href="/logout">Logout</a>
                    </li>
                    <li>
                        <Link to="/friends-or-not">List of People</Link>
                    </li>
                    <li>
                        {props.firstName} {props.lastName}
                    </li>
                </ul>
            </div>
        </>
    );
}
