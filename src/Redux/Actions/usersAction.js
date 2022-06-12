export const loginAction = (data) => {
    // console.log(`data dari UI:`, data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const logoutAction = () => {
    localStorage.removeItem("tokenIdUser")
    return {
        type: "LOGOUT"
    }
}

export const updateProfile = (data) => {
    return {
        type: "PROFILE_UPDATED",
        payload: data
    }
}