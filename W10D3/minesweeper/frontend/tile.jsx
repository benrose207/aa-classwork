import React from 'react';
import * as MineSweeper from './minesweeper';

export default class Tile extends React.Component{
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick (e) {
      e.preventDefault()

      let flagged = e.altKey
      // debugger
      this.props.newTile(this.props.tile, flagged)
    }

    render () {
      let text = '';
      let symbol = "";
      if (this.props.tile.flagged) {
        text = '\u{2691}';
        symbol = "flagged";
      } else if (this.props.tile.explored){
        const bombCount = this.props.tile.adjacentBombCount()
        if (this.props.tile.bombed){
          text = '\u{1F4A3}'
          symbol = "bombed";
        } else if (bombCount > 0){
          text = bombCount
        }
        symbol = "explored";
      }

      const tileClasses = `tile ${symbol}`;
      

      return (
        <div onClick={this.handleClick} className={tileClasses} >
          {text}
        </div>
      )
  }
}