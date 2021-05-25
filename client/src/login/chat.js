import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMessages: ", chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        console.log("useEffect mounted!!");
        console.log("elemRef.current.scrollTop: ", elemRef.current.scrollTop);
        console.log(
            "elemRef.current clientHeight: ",
            elemRef.current.clientHeight
        );
        console.log(
            "elemRef.element.scrollHeight: ",
            elemRef.current.scrollHeight
        );
        elemReft.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e: ", e.target.value);
            // 1st arg is name of the event
            socket.imit("chat message", e.target.value);
            // emit to the server
            e.target.value = "";
        }
    };

    console.log("ElemRef: ", elemRef);

    return (
        <>
            {/* CSS: height:300px overflow-y: auto */}
            <div>
                <h1>Chat room</h1>
                <div className="chat-message-contaner" ref={elemRef}></div>
                <ul>
                    <li>This is will be a chat message.</li>
                </ul>
                <textarea
                    onKeyDown={handleKeyDown}
                    placeholder="Place your chat here..."
                ></textarea>
            </div>
        </>
    );
}
