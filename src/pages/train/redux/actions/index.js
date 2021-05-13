export const ACTION_FETCH_DATA = 'FETCH_DATA'
export const ACTION_FETCH_SUCCESS = 'FETCH_SUCCESS'
export const ACTION_FETCH_FAILED = 'FETCH_FAILED'

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