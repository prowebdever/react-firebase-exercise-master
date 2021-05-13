export const ACTION_SIGN_IN = 'SIGN_IN'
export const ACTION_SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const ACTION_SIGN_IN_FAILED = 'SIGN_IN_FAILED'

export const signIn = (email, password) => {
    return {
        type: ACTION_SIGN_IN,
        email,
        password
    }
};

export const signInSuccess = (auth) => {
    return {
        type: ACTION_SIGN_IN_SUCCESS,
        auth
    }
};

export const signInFailed = (auth, error) => {
    return {
        type: ACTION_SIGN_IN_FAILED,
        auth,
        error
    }
}