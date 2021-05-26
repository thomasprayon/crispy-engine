import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    // console.log("chatMessages: ", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("useEffect mounted! in chat.js!");
        // console.log("elemRef.current.scrollTop: ", elemRef.current.scrollTop);
        // console.log(
        //     "elemRef.current clientHeight: ",
        //     elemRef.current.clientHeight
        // );
        // console.log(
        //     "elemRef.element.scrollHeight: ",
        //     elemRef.current.scrollHeight
        // );
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e: ", e.target.value);
            socket.imit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    // console.log("ElemRef: ", elemRef);

    return (
        <>
            {/* CSS: height:300px overflow-y: auto */}
            <div className="bg-white mt-5">
                <h1>Chat room</h1>
                <div className="chat-message-contaner" ref={elemRef}>
                    <ul>
                        <li>This is will be a chat message.</li>
                    </ul>
                </div>
                <textarea
                    onKeyDown={handleKeyDown}
                    placeholder="Place your chat here..."
                ></textarea>
            </div>
        </>
    );
}
