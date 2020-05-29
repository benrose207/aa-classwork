let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = new Array(8);

  for(let i = 0; i < 8; i++) {
    grid[i] = new Array(8);
  }

  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
   let row = pos[0];
   let col = pos[1];
   if ((row < 0 || row > 7) || (col < 0 || col > 7)) {
     return false;
   }
   return true;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
    throw new Error('Not valid pos!')
  }
  return this.getPosition(pos);
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let piece = this.getPosition(pos);
  if (piece) {
    return piece.color === color;
  } else {
    return false;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !!this.getPosition(pos);
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color. # everything was the opposite color until the end of the board (in that dir)
 *
 * Returns empty array if it hits an empty position. # something was empty
 *
 * Returns empty array if no pieces of the opposite color are found. # you hit another piece of your own color
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  if (piecesToFlip === undefined) {
    piecesToFlip = [];
  }
  let row = pos[0];
  let col = pos[1];
  let nextRow = row + dir[0];
  let nextCol = col + dir[1];
  let nextPos = [nextRow, nextCol];
  if (!this.isValidPos(nextPos)) {
    return [];
  } else if (!this.isOccupied(nextPos)) {
    return [];
  } else if (this.isMine(nextPos, color)) {
    return piecesToFlip;
  } else {
    piecesToFlip.push(nextPos);
    return this._positionsToFlip(nextPos, color, dir, piecesToFlip);
  }
};

Board.prototype.getPosition = function(pos) {
  let row = pos[0];
  let col = pos[1];
  return this.grid[row][col];
}

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }
  
  for(let i = 0; i < Board.DIRS.length; i++) {
    let potentialFlips = this._positionsToFlip(pos, color, Board.DIRS[i]);
    if (potentialFlips.length != 0) {
      return true;
    }
  }

    return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)){
    throw new Error('Invalid Move');
  }
  let toFlip = [];
  for (let i = 0; i < Board.DIRS.length; i++) {
    let potentialFlips = this._positionsToFlip(pos, color, Board.DIRS[i]);
    if (potentialFlips.length != 0) {
      toFlip = toFlip.concat(potentialFlips);
    }
  }
  toFlip.forEach(position => {
    this.getPiece(position).flip();
  });
  this.grid[pos[0]][pos[1]] = new Piece(color);
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  const moves = [];
  for(let i = 0; i < this.grid.length; i++) {
    for(let j = 0; j < this.grid[i].length; j++) {
      if (this.validMove([i, j], color)) {
        moves.push([i, j]);
      }
    }
  }
  return moves;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  if (this.validMoves(color).length != 0) {
    return true;
  } else {
    return false;
  }
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  if (this.hasMove('black') || this.hasMove('white')) {
    return false;
  } else {
    return true;
  }
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  console.log(["  0  ","1  ","2  ","3  ","4  ","5  ","6  ","7  "].join(""));

  for (let i = 0; i < this.grid.length; i++) {
    toPrint = `${i} `;
    for (let j = 0; j < this.grid[i].length; j++) {
      if (this.isOccupied([i, j]) ) {
        toPrint += this.grid[i][j].toString() + " |";
      } else {
        toPrint += '__|';
      }
    }
    console.log(toPrint);
  }
};



module.exports = Board;
