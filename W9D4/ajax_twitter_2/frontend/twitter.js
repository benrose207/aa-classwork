const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");

$(() => {
    $("button.follow-toggle").each((idx, el) => {
        new FollowToggle(el);
    });

    $("nav.users-search").each((idx, el) => {
        new UsersSearch(el);
    });

    $("form.tweet-compose").each((idx, el) => {
        new TweetCompose(el);
    });
})