const APIUtil = require("./api_util.js");

class FollowToggle {
    constructor(el) {
        this.$el = $(el);
        this.userId = this.$el.data("user-id");
        this.followState = this.$el.data("initial-follow-state");
        this.render();
        this.$el.on("click", this.handleClick.bind(this));
    }

    render() {
        this.$el.prop("disabled", false);
        if (this.followState === "unfollowed") {
            this.$el.html("Follow!")
        } else if (this.followState === "followed") {
            this.$el.html("Unfollow!")
        } else {
            this.$el.prop("disabled", true);
        }
    }

    handleClick(event) {
        event.preventDefault();
        if (this.followState === "followed") {
            this.followState = "unfollowing";
            debugger
            this.render();
            APIUtil.unfollowUser(this.userId).then(() => {
                    this.followState = "unfollowed";
                    debugger
                    this.render();
                });
        } else {
            this.followState = "following";
            debugger
            this.render();
            APIUtil.followUser(this.userId).then(() => {
                    this.followState = "followed";
                    debugger
                    this.render();
                });
        }
    }
}

module.exports = FollowToggle;