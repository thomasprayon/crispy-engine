import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptFriendRequest,
    getFriendsAndWannabes,
    unfriend,
} from "../action";

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
            <div className="friends-big-container">
                <div className="friends-container">
                    <h2>These people want to be your friends</h2>
                    {requests &&
                        requests.map((user, index) => {
                            // console.log("user: ", user);
                            return (
                                <div
                                    key={index}
                                    className="friends-friends-container"
                                >
                                    <img
                                        key={user.img_url}
                                        src={user.img_url}
                                        className="profile-img"
                                    />

                                    <div className="person-friend-text">
                                        <h3>
                                            {user.first_name}
                                            {user.last_name}
                                        </h3>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    acceptFriendRequest(user.id)
                                                )
                                            }
                                        >
                                            Accept Friend Request
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="requests-container">
                    <h2>These people are currently your friends</h2>
                    {friends &&
                        friends.map((user, index) => {
                            // console.log("user: ", user);
                            return (
                                <div
                                    key={index}
                                    className="request-friends-container"
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
                                    <button
                                        onClick={() =>
                                            dispatch(unfriend(user.id))
                                        }
                                    >
                                        Unfriend
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
