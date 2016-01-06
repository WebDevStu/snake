/**
 * Canvas class
 *
 * @constructor
 */
var Canvas = function () {

    this.frame = 0;
    this.speed = 60;

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
    this.snake = new Snake(this.ctx);

    // listen events
    _.listenTo({
        'frame:change': 'draw'
    }, this);
};


Canvas.prototype.draw = function () {

    this.frame += 1;

    if (this.frame >= this.speed) {
        this.frame = 0;

    }
};