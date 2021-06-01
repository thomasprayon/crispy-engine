import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavDropdown, Dropdown } from "react-bootstrap";
import ProfilePic from "./profile-pic";

export default function Header(props) {
    return (
        <>
            <Navbar className="background-nav" expand="xl">
                <Navbar.Brand href="/">
                    <img
                        src="/images/part1Crop.png"
                        alt="logo"
                        width="40"
                        height="40"
                        className="nav-logo"
                    />{" "}
                    <span className="font-weight-bold">ExpSwap</span>
                </Navbar.Brand>
                <div className="nav-dropdown">
                    <NavDropdown
                        title={
                            <span id="username-nav">
                                {`${props.firstName} ${props.lastName}`}
                            </span>
                        }
                    >
                        <NavDropdown.Item href="/" bg="secondary">
                            My Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/find/user">
                            Find People
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/friends-or-not">
                            Friends
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/chat">Chat</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/delete/user">
                            Delete Account
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/logout">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                    <ProfilePic
                        firstName={props.firstName}
                        lastName={props.lastName}
                        imgUrl={props.imgUrl}
                        toggleUploader={props.toggleUploader}
                    />
                </div>
            </Navbar>
        </>
    );
}
