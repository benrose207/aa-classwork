const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search");

$(() => {
    $("button.follow-toggle").each((idx, el) => {
        new FollowToggle(el);
    });

    $("nav.users-search").each((idx, el) => {
        new UsersSearch(el);
    });
})