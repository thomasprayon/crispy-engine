export default function (state = {}, action) {
    if (action.type === "FRIENDS_AND_WANNABES") {
        state = {
            ...state,
            users: action.users,
        };
    }

    return state;
}
