const INITIAL_STATE = {
    id: null,
    fullName: "",
    username: "",
    email: "",
    password: "",
    status: "loggedIn",
    profilePicture: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    userFollowed: [],
    posts: [
        {
            id: null,
            image: [],
            caption: "",
            usedLiked: [],
            userCommented: [
                {
                    username: "",
                    comment: "",
                    dateCreated: ""
                }
            ],
            dateCreated: ""
        }
    ]
}

export const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                ...action.payload
            };
        case "LOGOUT":
            return INITIAL_STATE;
        default:
            return state;
    }
}