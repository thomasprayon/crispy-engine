import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(viewerId) {
    const [buttonText, setButtonText] = useState("");
    console.log("viewerId", viewerId);

    useEffect(() => {
        console.log("useEffect just run in FriendButton!");
        axios.get("friend-status/:id").then((response) => {
            console.log("response", response);
        });
    });

    const handleSubmit = (e) => {
        e.preventDefault;
        axios.post("friend-status/:id").then((response) => {
            console.log("response", response);
        });
    };

    return (
        <>
            <button onClick={(e) => handleSubmit(e)}>
                Button should change!
            </button>
        </>
    );
}
