export default function (state = {}, action) {
    if (action.type === "FRIENDS_AND_WANNABES") {
        state = {
            ...state,
            users: action.users,
        };
    }
    if (action.type === "ACCEPT_REQUEST") {
        state = {
            ...state,
            users: state.users.map((user) => {
                // console.log("action.id: ", action.id);
                // console.log("user.id: ", user.id);
                if (action.id == user.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type === "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter((user) => user.id !== action.id),
        };
    }
    return state;
}
