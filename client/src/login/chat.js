import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMessages: ", chatMessages);

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
            // console.log("e: ", e.target.value);
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    // console.log("ElemRef: ", elemRef);

    return (
        <>
            {/* CSS: height:300px overflow-y: auto */}
            <Container className="bg-white mt-5">
                <h1>Chat room</h1>
                <div className="chat-message-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((message, index) => {
                            // console.log("message:", message);
                            console.log("index: ", index);
                            return (
                                <>
                                    <Row className="bg-secondary m-2 rounded">
                                        <div>
                                            <img
                                                src={message.img_url}
                                                className="img-chat"
                                            />
                                        </div>
                                        <div>
                                            <p>
                                                {message.first_name}{" "}
                                                {message.last_name}
                                            </p>
                                            <p key={index}>{message.message}</p>
                                            <p>{message.created_at}</p>
                                        </div>
                                    </Row>
                                </>
                            );
                        })}
                </div>
                <textarea
                    onKeyDown={handleKeyDown}
                    placeholder="Place your chat here..."
                    className="form-control"
                ></textarea>
            </Container>
        </>
    );
}
