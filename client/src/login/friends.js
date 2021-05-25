import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    acceptFriendRequest,
    getFriendsAndWannabes,
    unfriend,
} from "../action";
import { Col, Container, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FriendsOrNot() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted === true)
    );
    const requests = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted === false)
    );

    // console.log("friends in global state in friends.js: ", friends);
    // console.log("requests in global state in friends.js: ", requests);

    useEffect(() => {
        dispatch(getFriendsAndWannabes());
    }, []);

    return (
        <>
            <Container className="mt-3 ">
                <Container className="bg-white friends-container">
                    <h2>These people want to be your friends</h2>
                    {requests &&
                        requests.map((user, index) => {
                            // console.log("user: ", user);
                            return (
                                <div
                                    className="d-inline-flex bg-secondary mx-2 rounded"
                                    key={index}
                                >
                                    <Col key={index}>
                                        <Link
                                            to={`/user/${user.id}`}
                                            key={index}
                                        >
                                            <img
                                                key={user.img_url}
                                                src={user.img_url}
                                                className="profile-img mx-2"
                                            />

                                            <h4>
                                                {user.first_name}
                                                {user.last_name}
                                            </h4>
                                        </Link>
                                        <Row>
                                            <Button
                                                onClick={() =>
                                                    dispatch(
                                                        acceptFriendRequest(
                                                            user.id
                                                        )
                                                    )
                                                }
                                            >
                                                Accept Friend Request
                                            </Button>
                                        </Row>
                                    </Col>
                                </div>
                            );
                        })}
                </Container>
                <Container className="bg-white mt-2 friends-container">
                    <h2>These people are currently your friends</h2>
                    {friends &&
                        friends.map((user, index) => {
                            // console.log("user: ", user);
                            return (
                                <div
                                    className="d-inline-flex bg-secondary mx-2 rounded"
                                    key={index}
                                >
                                    <Col key={index}>
                                        <Link
                                            to={`/user/${user.id}`}
                                            key={index}
                                        >
                                            <img
                                                key={user.img_url}
                                                src={user.img_url}
                                                className="profile-img"
                                            />

                                            <h3>
                                                {user.first_name}
                                                {user.last_name}
                                            </h3>
                                        </Link>
                                        <Row>
                                            <Button
                                                onClick={() =>
                                                    dispatch(unfriend(user.id))
                                                }
                                            >
                                                Unfriend
                                            </Button>
                                        </Row>
                                    </Col>
                                </div>
                            );
                        })}
                </Container>
            </Container>
        </>
    );
}
