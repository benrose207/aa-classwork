const CONSTANTS = {
    GRAVITY: 0.5,
    FLAP_SPEED: -8,
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30
};

export default class Bird {
    constructor(dimensions) {
        this.velocity = 0;
        this.dimensions = dimensions;
        this.xPosition = 160;
        this.yPosition = 300;
    }

    drawBird(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.xPosition, this.yPosition, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    animate (ctx) {
        this.move();
        this.drawBird(ctx);
    }

    move () {
        this.yPosition += this.velocity;
        this.velocity += CONSTANTS.GRAVITY;
    }

    flap () {
        this.velocity = CONSTANTS.FLAP_SPEED;
    }
}