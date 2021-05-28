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
            <Container className="my-3">
                <Container className="background friends-container">
                    <h2>These people want to be your friends</h2>
                    {requests &&
                        requests.map((user, index) => {
                            // console.log("user: ", user);
                            return (
                                <div
                                    className="d-inline-flex bg-info m-2 friends-content rounded"
                                    key={index}
                                >
                                    <Link
                                        to={`/user/${user.id}`}
                                        key={index}
                                        id="link-find"
                                    >
                                        <div className="d-flex justify-content-center">
                                            <img
                                                key={user.img_url}
                                                src={user.img_url}
                                                className="profile-img align-self-center"
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <h4 className="align-self-center">
                                                {user.first_name}{" "}
                                                {user.last_name}
                                            </h4>
                                        </div>
                                    </Link>
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            onClick={() =>
                                                dispatch(
                                                    acceptFriendRequest(user.id)
                                                )
                                            }
                                        >
                                            Accept Friend Request
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                </Container>
                <Container className="background friends-container my-3">
                    <h2>These people are currently your friends</h2>
                    {friends &&
                        friends.map((user, index) => {
                            // console.log("user: ", user);
                            return (
                                <div
                                    className="d-inline-flex bg-info m-2 friends-content rounded"
                                    key={index}
                                >
                                    {/* <Row
                                        key={index}
                                        className="d-flex justify-content-center m-1"
                                    > */}

                                    <Link
                                        to={`/user/${user.id}`}
                                        key={index}
                                        id="link-find"
                                    >
                                        <div className="d-flex justify-content-center">
                                            <img
                                                key={user.img_url}
                                                src={user.img_url}
                                                className="profile-img"
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <h3 className="">
                                                {user.first_name}{" "}
                                                {user.last_name}
                                            </h3>
                                        </div>
                                    </Link>
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            onClick={() =>
                                                dispatch(unfriend(user.id))
                                            }
                                        >
                                            Unfriend
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                </Container>
            </Container>
        </>
    );
}
