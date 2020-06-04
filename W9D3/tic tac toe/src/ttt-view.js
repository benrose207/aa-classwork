class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  bindEvents() {
    $('li').hover(() => {
      let $square = $(event.target);
      $square.addClass('hover')}, 
      function () {
        let $square = $(event.target);
        $square.removeClass('hover')
      });

    $('li').on('click', ()=>{
      let $square = $(event.target)
      let pos = $square.data('pos');
      // this.makeMove($square)
      if (!this.game.board.isEmptyPos(pos)) {
        alert('NOPE')
      } else {
        this.game.playMove(pos);
        let mark = this.game.board.grid[pos[0]][pos[1]]
        $square.html(mark)
        $square.off('mouseenter')
        $square.addClass('selected')
        if (this.game.isOver() && this.game.winner() !=  null){
          $('li').each((index,ele) => {
            let $ele = $(ele);
            if ($ele.html() === mark) {
              $ele.addClass('winner')
            } else {
              $ele.addClass('loser')
            }
          }) 
          $('li').off('click mouseenter');
          $('li').removeClass('hover');
          $square.addClass('winner')
          let $fg = $('<figcaption>');
          $fg.html(`You Win, ${mark}`)
          $('body').append($fg);
        } else if (this.game.isOver()) {
          $('li').off('click mouseenter');
          $('li').removeClass('hover');
          $('ul').addClass('loser')
          let $fg = $('<figcaption>');
          $fg.html(`Draw`)
          $('body').append($fg);
        }
      }
      // how can we directly call the MoveError
    })
  }

  makeMove($square) {
    
  }

  setupBoard() {
    let $ul = $('<ul>');
    $('.ttt').append($ul);

    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++) {
        let $li = $('<li>');
        $li.data("pos",[i,j])
        $ul.append($li);
      }
    }

  }
}

module.exports = View;
