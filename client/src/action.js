import axios from "./axios";

export function getFriendsAndWannabes() {
    return axios
        .get("/friends-wannabes")
        .then(({ data }) => {
            // console.log("data: ", data);
            return {
                type: "FRIENDS_AND_WANNABES",
                users: data,
            };
        })
        .catch((err) => {
            console.log("Error in axios GET /friends-wannabes", err);
        });
}

export function acceptFriendRequest(id) {
    console.log("click accepting friend request");
    // console.log("id: ", id);
    return axios
        .post("/friend-status/" + id, { buttonText: "Accept Request" })
        .then(({ data }) => {
            console.log("data: ", data);
            return {
                type: "ACCEPT_REQUEST",
                id,
            };
        })
        .catch((err) =>
            console.log("Error in accepting pending requests", err)
        );
}

export function unfriend(id) {
    console.log("click unfriend request");
    return axios
        .post("/friend-status/" + id, { buttonText: "Unfriend" })
        .then(({ data }) => {
            console.log("data: ", data);
            return {
                type: "UNFRIEND",
                id,
            };
        })
        .catch((err) => {
            console.log("Error in unfriending a already friend", err);
        });
}

export function chatMessages(msgs) {
    // console.log("chatMessages msgs: ", msgs);
    return {
        type: "LAST_MESSAGES",
        payload: msgs,
    };
}

export function chatMessage(msg) {
    console.log("chatMessage msg: ", msg);
    return {
        type: "ADD_MESSAGE",
        payload: msg,
    };
}
