// ALL CONTEXT API FILES WITHIN src/context CONTAIN CODE SOURCED FROM https://github.com/safak/youtube/tree/mern-social-app/client/src

// all of the possible outcomes of login

export const LoginStart=(userCredentials)=> ({
    type:"LOGIN_START",
});

export const LoginSuccess=(user)=> ({
    type:"LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure=(error)=> ({
    type:"LOGIN_FAILURE",
    payload: error,
});

export const Follow = (username) => ({
    type: "FOLLOW",
    payload: username,
});
  
export const Unfollow = (username) => ({
    type: "UNFOLLOW",
    payload: username,
});

export const AcceptFollow = (username) => ({
    type: "ACCEPT_FOLLOW",
    payload: username,
});

export const LogoutSuccess = () => ({
    type: "LOGOUT_SUCCESS",
});