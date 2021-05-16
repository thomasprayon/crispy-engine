export default function NavBar(props) {
    return (
        <>
            <div className="navbar-container">
                <ul className="breadcrumb">
                    <li>My Profile</li>
                    <li>
                        <a href="/logout">Logout</a>
                    </li>
                    <li>
                        {props.firstName} {props.lastName}
                    </li>
                </ul>
            </div>
        </>
    );
}
