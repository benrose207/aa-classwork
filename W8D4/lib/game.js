const readline = require("readline");
const Piece = require("./piece.js");
const Board = require("./board.js");
const HumanPlayer = require("./humanplayer.js");
const AIPlayer = require("./aiplayer.js");
/**
 * Sets up the game with a board and the first player to play a turn.
 */
function Game () {
  this.board = new Board();
  this.turn = "black";
  this.player1 = new HumanPlayer('Human', 'black');
  this.player2 = new AIPlayer('Bill', 'white');
};

/**
 * Flips the current turn to the opposite color.
 */
Game.prototype._flipTurn = function () {
  this.turn = (this.turn == "black") ? "white" : "black";
};

// Dreaded global state!
let rlInterface;

/**
 * Creates a readline interface and starts the run loop.
 */
Game.prototype.play = function () {
  rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  this.runLoop(function () {
    rlInterface.close();
    rlInterface = null;
  });
};

/**
 * Gets the next move from the current player and
 * attempts to make the play.
 */
Game.prototype.playTurn = function (callback) {
  this.board.print();
  
  rlInterface.question(
    `${this.turn}, where do you want to move?`,
    handleResponse.bind(this)
  );

  function handleResponse(answer) {
    const pos = JSON.parse(answer);
    if (!this.board.validMove(pos, this.turn)) {
      console.log("Invalid move!");
      this.playTurn(callback);
      return;
    }
    
    if (this.turn === 'black') {
      this.player1.placePiece(this.board, pos)
    } else {
      this.player2.placePiece(this.board)
    }
    
    this._flipTurn();
    callback();
  }

};

/**
 * Continues game play, switching turns, until the game is over.
 */
Game.prototype.runLoop = function (overCallback) {
  if (this.board.isOver()) {
    console.log("The game is over!");
    overCallback();
  } else if (!this.board.hasMove(this.turn)) {
    console.log(`${this.turn} has no move!`);
    this._flipTurn();
    this.runLoop();
  } else {
    this.playTurn(this.runLoop.bind(this, overCallback));
  }
};

module.exports = Game;


newGame = new Game();
newGame.play();