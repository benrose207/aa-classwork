const View = require("./ttt-view.js");
const Game = require("./game.js");

  $(() => {
    const game = new Game()
    const $ttt = $('.ttt')

    const view = new View(game, $ttt)
    view.setupBoard()
    view.bindEvents()
    // Your code here
  });
