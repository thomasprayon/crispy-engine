import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserStatus from "./users-online";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMessages: ", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("useEffect mounted! in chat.js!");

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

    return (
        <>
            <Container className="background mt-3 rounded">
                <h1>Chat room</h1>
                <Row className="bg-info chat-message-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((message, index) => {
                            // console.log("message:", message);
                            // console.log("index: ", index);
                            return (
                                <>
                                    <Container
                                        className="bg-primary m-2 rounded"
                                        key={index}
                                    >
                                        <div>
                                            <div>
                                                <p className="text-capitalize font-weight-bold">
                                                    {message.first_name}{" "}
                                                    {message.last_name}
                                                </p>
                                                <p>
                                                    {new Date(
                                                        message.created_at
                                                    )
                                                        .toUTCString()
                                                        .replace("GMT", "")}
                                                </p>
                                            </div>
                                            <Col>
                                                <Row>
                                                    <img
                                                        src={
                                                            message.img_url ||
                                                            "/images/user_default.png"
                                                        }
                                                        className="rounded-circle profile-pic-img border border-dark align-self-end mb-2"
                                                        width="50"
                                                        height="50"
                                                    />

                                                    <div className="chat-bubble">
                                                        <p>{message.message}</p>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </div>
                                    </Container>
                                </>
                            );
                        })}
                </Row>
            </Container>
            <Container className="background mt-3 rounded">
                <Row className="p-3">
                    <textarea
                        onKeyDown={handleKeyDown}
                        placeholder="Place your words here..."
                        className="form-control"
                    ></textarea>
                </Row>
            </Container>
            <UserStatus />
        </>
    );
}
