import io from "socket.io-client";

import { chatMessages, chatMessage } from "../action";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            // console.log("msgs from socket: ", msgs);
            store.dispatch(chatMessages(msgs));
        });

        socket.on("chatMessage", (msg) => {
            // console.log("msg from socket: ", msg);
            store.dispatch(chatMessage(msg));
        });
    }
};
