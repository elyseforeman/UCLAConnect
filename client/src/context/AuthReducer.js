  // ALL CONTEXT API FILES WITHIN src/context CONTAIN CODE SOURCED FROM https://github.com/safak/youtube/tree/mern-social-app/client/src

  
  const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
        };
      case "FOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            following: [...state.user.following, action.payload],
          },
        };
      case "UNFOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            following: state.user.following.filter ((following) => following !== action.payload),
          },
        };
        case "ACCEPT_FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: [...state.user.followers, action.payload],
                },
            }
        case "UPDATE": 
        return {
            ...state,
            user: {
              ...state.user,
              username: action.payload.username,
              profilePicture: action.payload.profilePicture,
              coverPicture: action.payload.coverPicture,
              description: action.payload.description,
              isPrivate: action.payload.isPrivate
            },
          };        
        case "LOGOUT_SUCCESS":
            return{
                user: null,
                isFetching: null,
                error: false,
            }
      default:
        return state;
    }
  };
  export default AuthReducer
  