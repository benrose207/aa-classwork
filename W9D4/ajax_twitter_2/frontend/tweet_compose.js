const APIUtil = require("./api_util");

class TweetCompose {
    constructor (el) {
        this.$el = $(el);

        this.$el.on("submit", this.submit.bind(this));
    }

    submit (event) {
        event.preventDefault();
        const formContents = this.$el.serializeJSON();

        $(":input").each((idx, el) => {
            $(el).prop("disabled", true);
        })

        APIUtil.createTweet(formContents).then(this.handleSuccess.bind(this));
    }

    clearInput () {
        $("textarea, select").each((idx, el) => {
            $(el).val("");
        });
    }

    handleSuccess(res) {
        this.clearInput();

        $(":input").each((idx, el) => {
            $(el).prop("disabled", false);
        })

        // const $ul = ;
    }
}

module.exports = TweetCompose;