import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FriendsOrNot() {
    const dispatch = useDispatch();

    return (
        <>
            <div className="friends-container">
                <h1>These people want to be your friends</h1>
                <div className="request-friends-container">
                    <img src="#"></img>
                    <h3>Username</h3>
                    <button>Accept Friend Request</button>
                </div>
                <h1>These people are currently your friends</h1>
                <div className="request-friends-container">
                    <img src="#"></img>
                    <h3>Username</h3>
                    <button>Unfriend</button>
                </div>
            </div>
        </>
    );
}
