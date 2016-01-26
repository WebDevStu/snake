/**
 * Canvas class
 *
 * @constructor
 */
var Canvas = function () {

    // listen events
    _.listenTo({
        'frame:change': 'draw',
        'food:eaten':   'setFood',
        'game:over':    'gameOver'
    }, this);

    // config
    this.frame = 0;
    this.speed = 10;
    this.food = {
        x: null,
        y: null
    };

    // canvas
    this.canvas = document.createElement('canvas');
    // attrs
    this.canvas.width = 400;
    this.canvas.height = 300;
    this.canvas.className = 'board';

    // context & append
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    // new snake for the board
    this.snake = new Snake(this.ctx, this.food);

    this.setFood();
};


/**
 * clear
 */
Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


/**
 * draw
 */
Canvas.prototype.draw = function () {

    this.frame += 1;

    if (this.frame >= this.speed) {
        this.frame = 0;

        this.clear();
        this.snake.move();

        this.drawFood()
    }
};


/**
 * setFood
 */
Canvas.prototype.setFood = function () {

    this.food.x = _.random(390, 10);
    this.food.y = _.random(140, 10);

    this.drawFood();
};


/**
 * drawFood
 */
Canvas.prototype.drawFood = function () {

    this.ctx.beginPath();
    this.ctx.rect(this.food.x, this.food.y, 10, 10);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
};


Canvas.prototype.gameOver = function () {

    this.clear();

    this.ctx.font = "70px Arial";
    this.ctx.fillText("Game Over!",10,150);
};
