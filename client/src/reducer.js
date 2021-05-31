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
    if (action.type === "ADD_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.payload],
        };
    }
    if (action.type === "LAST_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.payload,
        };
    }
    if (action.type === "USER_ONLINE") {
        state = {
            ...state,
            usersOnline: action.payload,
        };
    }

    return state;
}
