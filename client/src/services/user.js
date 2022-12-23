// For post HTTP requests to backend api
import ServerAPI from './http-base.js';

class UserAPI {
    getAll() {
        return ServerAPI.get(`users`);
    }
    getUser(username) {
        return ServerAPI.get(`users/${username}`);
    }
    getUserById(userId) {
        return ServerAPI.get(`users/get/${userId}`);
    }

    registerUser(user) {
        return ServerAPI.post(`users/register`, user)
    }
    updateUser(updated_user) {
        return ServerAPI.patch(`users/`, updated_user)
    }
    followUser(user, profileUser) {
        return ServerAPI.put(`/users/follow/${profileUser.username}`, {
            username: user.username,
        });
    } 
    unfollowUser(user, profileUser) {
        return ServerAPI.put(`/users/unfollow/${profileUser.username}`, {
            username: user.username,
        });
    }
    // acceptFollow(userUsername, profileUsername, bool) {
    //     return ServerAPI.put(`/users/accept/${profileUsername}`, {
    //         username: userUsername, accepted: bool
    //     });
    // }

    getFollowRequestUsers(username) {
        return ServerAPI.get(`/users/requests/${username}`)
    }




}

export default new UserAPI();