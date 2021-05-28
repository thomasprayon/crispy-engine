import { useState, useEffect } from "react";
import axios from "../axios";
import { Button } from "react-bootstrap";

export default function FriendButton({ viewerId }) {
    const [buttonText, setButtonText] = useState("");

    // console.log("viewerId: ", viewerId);

    useEffect(() => {
        console.log("useEffect just run in FriendButton!");
        axios
            .get("/friend-status/" + viewerId)
            .then(({ data }) => {
                // console.log("GET data: ", data);
                setButtonText(data.buttonText);
            })
            .catch((err) => {
                console.log("Error in GET axios /friend-status/:id", err);
            });
    }, []);

    const handleSubmit = (e) => {
        console.log("handleSubmit in friend-button working!");
        console.log("buttonText before POST: ", buttonText);
        e.preventDefault;
        axios
            .post("/friend-status/" + viewerId, { buttonText: buttonText })
            .then(({ data }) => {
                // console.log("POST data.btnText; ", data);
                setButtonText(data.buttonText);
            })
            .catch((err) => {
                console.log("Error in POST axios /friend-status/:id", err);
            });
    };

    return (
        <>
            <Button onClick={(e) => handleSubmit(e)}>{buttonText}</Button>
        </>
    );
}
