const APIUtil = require("./api_util");

class UsersSearch {
    constructor (el) {
        this.$el = $(el);
        this.$input = $("#search-input");
        this.$ul = $("ul.users");

        this.$el.on("input", this.handleInput.bind(this));
    }

    handleInput (event) {
        event.preventDefault();
        const queryVal = {query: this.$input.val()};
        APIUtil.searchUsers(queryVal).then(this.renderResults.bind(this));
    }

    renderResults (usersArray) {
        $("li").remove();
        // debugger
        usersArray.forEach(user => {
            const $li = $("<li>");
            const $link = $("<a>").attr("href", `/users/${user.id}`).html(user.username);
            $li.append($link);
            this.$ul.append($li);
        })
    }
}

module.exports = UsersSearch;