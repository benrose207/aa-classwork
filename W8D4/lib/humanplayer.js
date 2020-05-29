/*
- Need to take in a user's move. #getMove
    includes validtion for only valid moves;
- variable for color? 
- variable for name
*/
const readline = require("readline");

function HumanPlayer(name, color) {
    this.name = name;
    this.color = color;
}



HumanPlayer.prototype.placePiece = function (board, pos) {
    // let rlInterface = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    //     terminal: false
    // });

    board.placePiece(pos, this.color);
}


module.exports = HumanPlayer;