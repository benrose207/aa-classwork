// function Surrogate () {};
// Surrogate.prototype = Superclass.prototype;
// Subclass.prototype = new Surrogate();
// Subclass.prototype.constructor = Subclass;

Function.prototype.inherits = function (Superclass) {
    function Surrogate () {};
    Surrogate.prototype = Superclass.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}

function MovingObject() {
    this.speed = '1000mph';

    // function _addJump () {
    //     console.log("Jumps 1000 ft.!");
    // }
}

MovingObject.prototype._addJump = function () {
    console.log("Jumps 1000 ft.!");
}

function Ship() { 
    MovingObject.call(this);
    this.size = "really big";
}
Ship.inherits(MovingObject);

function Asteroid() { 
    MovingObject.call(this);
    this.temperature = "Icy cold";
}

Asteroid.inherits(MovingObject);

Asteroid.prototype.orbitType = function() {
    console.log("Asteroid is now orbiting");
}

ash = new Asteroid();
console.log(ash.__proto__.__proto__);
console.log(ash.speed);
ash.orbitType();

// MovingObject._addJump();
yacht = new Ship;
yacht._addJump();
console.log(yacht.temperature);


// move = new MovingObject;
// console.log(move.size);