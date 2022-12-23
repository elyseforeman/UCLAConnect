// For post HTTP requests to backend api
// For post HTTP requests to backend api
import ServerAPI from './http-base.js';
class PostAPI {

    getAll() {
        return ServerAPI.get(`posts`);
    }

    getPostsByFollowing(username) {
        return ServerAPI.get(`/posts/following/${username}`)
    }
    
    getPersonalized(userid) {
        return ServerAPI.get(`posts/personalized/${userid}`);
    }

    getPostById(id) {
        return ServerAPI.get(`posts/${id}`);
    }
 
    createPost(event) {
        return ServerAPI.post(`posts/`, event);
    }

    addToCalendar(code, props) {
        return ServerAPI.post('posts/add-to-calendar', { code, props });
    }

    deletePost(id) {
        return ServerAPI.delete(`posts/${id}`);
    }

    likePost(postid, userid, bool) {
        if (bool) {
            // Not optimal, should somehow return results for both requests!
            ServerAPI.patch(`users/rsvp1/${userid}`,{postId: postid});
            return ServerAPI.patch(`posts/rsvp1/${postid}`);
        } else {
            ServerAPI.patch(`users/rsvp0/${userid}`,{postId: postid});
            return ServerAPI.patch(`posts/rsvp0/${postid}`);
        }
    }
    getRSVPPosts(username) {
        return ServerAPI.get(`posts/rsvp/${username}`)
    }
    getPostByTags(tags){
        let queryString = "";

        for(let i = 0; i < tags.length; i++)
        {
            if(i === tags.length -1)
                queryString += 'tags=' + tags[i]
            else
                queryString+= 'tags=' + tags[i] + '&'
        }
        console.log(queryString)
        return ServerAPI.get(`posts/filter/tags?` + queryString)
    }

    getPostsByUser(username){ //! might not work w/o id
        return ServerAPI.get(`posts/profile/${username}`)
    }

    getPostsByIndex(keyword){
        console.log(keyword)
        return ServerAPI.get(`postsearch/${keyword}`)
    }
}

export default new PostAPI();