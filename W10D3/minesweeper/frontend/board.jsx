import React from 'react'
import Tile from './tile'

const Board = (props) => {
    return (
      <div className="board">
        {props.board.grid.map((row, idx1) => (
          <div key={idx1}>
            {row.map((ele, idx2) => (
                <span key={idx2}>
                    <Tile tile={ele} newTile={props.update} />
                </span>
            ))}
          </div>
        ))}
      </div>
    )
};

export default Board;