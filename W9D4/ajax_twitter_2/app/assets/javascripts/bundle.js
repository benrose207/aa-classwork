/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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
            this.render();
            APIUtil.unfollowUser(this.userId).then(() => {
                    this.followState = "unfollowed";
                    this.render();
                });
        } else {
            this.followState = "following";
            this.render();
            APIUtil.followUser(this.userId).then(() => {
                    this.followState = "followed";
                    this.render();
                });
        }
    }
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose */ "./frontend/tweet_compose.js");

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

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map