const APIUtil = {
    followUser: id => APIUtil.changeFollowStatus(id, "POST"),
    unfollowUser: id => APIUtil.changeFollowStatus(id, "DELETE"),
    
    changeFollowStatus: (id, method) => {
        return $.ajax({
            url: `/users/${id}/follow`,
            method: method,
            dataType: "JSON",
        })
    },

    searchUsers: queryVal => {
        return $.ajax({
            url: "/users/search",
            method: "GET",
            dataType: "JSON",
            data: queryVal
        })
    },

    createTweet: formContents => {
        return $.ajax({
            url: "/tweets",
            method: "POST",
            dataType: "JSON",
            data: formContents
        })

    }
};

module.exports = APIUtil;