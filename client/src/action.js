import axios from "./axios";

export function getFriendsAndWannabes() {
    return axios
        .get("/friends-wannabes")
        .then(({ data }) => {
            console.log("data: ", data);
            return {
                type: "FRIENDS_AND_WANNABES",
                users: data,
            };
        })
        .catch((err) => {
            console.log("Error in axios GET /friends-wannabes", err);
        });
}

export function acceptFriendRequest() {
    axios.post("/friend-status/:id");
}

export function unfriend() {
    axios.post("/friend-status/:id");
}
