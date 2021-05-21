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
            state.friends &&
            state.friends.filter((user) => user.accepted == true)
    );

    console.log("friends in global state in friends.js: ", friends);

    useEffect(() => {
        dispatch(getFriendsAndWannabes());
    }, []);

    return (
        <>
            <div className="friends-container">
                <h1>These people want to be your friends</h1>
                <div className="request-friends-container">
                    <img src="#"></img>
                    <h3>Username & Userlastname</h3>
                    <button onClick={() => dispatch(acceptFriendRequest())}>
                        Accept Friend Request
                    </button>
                </div>

                <h1>These people are currently your friends</h1>
                <div className="request-friends-container">
                    <img src="#"></img>
                    <h3>Username</h3>
                    <button onClick={() => dispatch(unfriend())}>
                        Unfriend
                    </button>
                </div>
            </div>
        </>
    );
}
