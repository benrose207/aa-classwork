const Utils = require('./utils')
const MovingObject = require("./moving_object");
const Asteroid = require("./asteroid");
const Ship = require("./ship");

function Game (ctx) {
  this.ctx = ctx;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });
}

Object.defineProperties(Game, {
  "DIM_X": {"value": 700},
  "DIM_Y": {"value": 700},
  "NUM_ASTEROIDS": {"value": 10}
});

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let newAsteroid = new Asteroid({ pos: this.randomPosition(), 
                                     game: this });
    this.asteroids.push(newAsteroid);
  }
}

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship);
}

Game.prototype.randomPosition = function () {
  let xPos = Math.floor(Math.random() * Game.DIM_X);
  let yPos = Math.floor(Math.random() * Game.DIM_Y);
  return [xPos, yPos];
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 700, 700);
  this.allObjects().forEach( obj => { obj.draw(this.ctx) });
}

Game.prototype.moveObjects = function() {
  this.allObjects().forEach( obj => { obj.move() });
}

Game.prototype.wrap = function(pos) {
    let [newXPos, newYPos] = [pos[0], pos[1]];

    if (pos[0] < 0) {
        newXPos = 700;
    } else if (pos[0] > 700) {
        newXPos = 0;
    }

    if (pos[1] > 700) {
        newYPos = 0;
    } else if (pos[1] < 0) {
        newYPos = 700;
    }

    return [newXPos, newYPos];
}

Game.prototype.checkCollisions = function() {
    let i = 0;

    while (i < this.allObjects().length) {
        let j = i + 1;

        while (j < this.allObjects().length) {
            if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
                this.allObjects()[i].collideWith(this.allObjects()[j]);
                i--;
                break;
            }
            j++;
        }
        i++;
    }

}

Game.prototype.step = function() {
  this.moveObjects();
  this.draw(this.ctx);
  this.checkCollisions();
}

Game.prototype.remove = function (asteroid) {
    let index = this.asteroids.indexOf(asteroid);
    const leftHalf = this.asteroids.slice(0, index)
    const rightHalf = this.asteroids.slice(index + 1);
    this.asteroids = leftHalf.concat(rightHalf);
}

module.exports = Game;