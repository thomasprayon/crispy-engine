import { useState, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        // console.log("useEffect just ran for /find/users");
        axios
            .get("/find-users")
            .then((data) => {
                // console.log("data.data /find-users: ", data.data);
                setUsers(data.data);
            })
            .catch((err) => {
                console.log("Error in /find/users", err);
            });
    }, []);

    useEffect(() => {
        // console.log("useEffect just ran /find-users/:id!");
        // console.log("searchInput", searchInput);
        let ignore = false;
        axios
            .get("/find-users/" + searchInput)
            .then((data) => {
                // console.log("response /find-user/:id ", data.data);
                if (!ignore) {
                    setUsers(data.data);
                }
            })
            .catch((err) => {
                console.log("Error in /find-users/:id", err);
            });
        return () => {
            ignore = true;
        };
    }, [searchInput]);

    const handleChange = ({ target }) => {
        setSearchInput(target.value);
    };

    return (
        <>
            <Container className="mt-3">
                <Col>
                    <Row>
                        <h2 className="text-white">Find People</h2>
                    </Row>
                    <Row>
                        <input
                            onChange={handleChange}
                            placeholder="Connect with your friends..."
                            className="form-control col-sm-4"
                        />
                    </Row>
                </Col>
                {!searchInput && (
                    <h5 className="text-white">Last people who join!</h5>
                )}
                {users.map((user, index) => {
                    // console.log("user", user);
                    return (
                        <Row
                            key={index}
                            className="bg-white mt-4  other-profile-container"
                        >
                            <Link
                                to={`/user/${user.id}`}
                                key={index}
                                id="link-find"
                            >
                                <Col className="d-flex-align-items-center">
                                    <Row>
                                        <img
                                            src={user.img_url}
                                            className="profile-img m-2"
                                        />

                                        <h3 className="m-4">
                                            {user.first_name} {user.last_name}
                                        </h3>
                                    </Row>
                                </Col>
                            </Link>
                        </Row>
                    );
                })}
            </Container>
        </>
    );
}
