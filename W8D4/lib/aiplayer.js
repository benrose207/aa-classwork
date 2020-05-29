/*
- Need to take in a user's move. #getMove
    includes validtion for only valid moves;
- variable for color? 
- variable for name
*/
const readline = require("readline");

function AIPlayer(name, color) {
    this.name = name;
    this.color = color;
}



AIPlayer.prototype.placePiece = function (board) {
    // let rlInterface = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    //     terminal: false
    // });

    let moves = board.validMoves(this.color)
    
    let pos = moves[Math.floor(Math.random() * moves.length)];
    
    board.placePiece(pos, this.color);
}


module.exports = AIPlayer;