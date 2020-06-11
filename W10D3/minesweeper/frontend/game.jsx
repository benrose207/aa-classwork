import React from 'react';
import * as MineSweeper from './minesweeper';
import Board from './board';

export default class Game extends React.Component {
    constructor (props) {
        super(props)
        this.state = ({ board: new MineSweeper.Board(10, 10)});
        this.updateGame = this.updateGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }

    updateGame (tile, flagged) {
      if (flagged) {
        tile.toggleFlag()
      } else {
        tile.explore()
      }
      // debugger
      this.setState({ board: this.state.board })
    }

    restartGame () {
      this.setState({ board: new MineSweeper.Board(10, 10) });
    }
    
    render () {
      // debugger
      let modalClass = 'hidden'
      if (this.state.board.won() || this.state.board.lost()) {
        modalClass = 'gameOver'
      }

      return (
        <>
            <h1>Minesweeper</h1>
            <Board board={this.state.board} update={this.updateGame} />
            <div className={modalClass}>
                <div>
                    { this.state.board.won() ? 'You Win' : ""}
                    { this.state.board.lost() ? 'You Lost' : ""}
                    <br/>
                    <button onClick={this.restartGame}>Play Again</button>
                </div>
            </div>
        </>
        )
      }
    }