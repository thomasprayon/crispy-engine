import axios from "./axios";

export function getFriendsAndWannabes() {
    axios.get("/friends-wannabes");
}

export function acceptFriendRequest() {
    axios.post("/friend-status/:id");
}

export function unfriend() {
    axios.post("/friend-status/:id");
}
