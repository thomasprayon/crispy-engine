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
    // const buttonText = "Accept Request";
    // console.log("buttonText: ", buttonText);
    return axios
        .post("/friend-status/" + id)
        .then(({ data }) => {
            console.log("data: ", data);
        })
        .catch((err) =>
            console.log("Error in accepting pending requests", err)
        );
}

export function unfriend(id) {
    console.log("click unfriend request");
    return axios
        .post("/friend-status/" + id)
        .then(({ data }) => {
            console.log("data: ", data);
        })
        .catch((err) => {
            console.log("Error in unfriending a already friend", err);
        });
}
