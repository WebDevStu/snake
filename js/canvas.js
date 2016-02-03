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
        'change:speed': 'speedUpSnake',
        'change:score': 'updateScore',
        'game:over':    'gameOver'
    }, this);

    // config
    this.frame = 0;
    this.speed = 10;
    this.food = {
        x: null,
        y: null
    };
    this.gameScore = 0;
    this.highScore = localStorage.getItem('highScore') || 0;
    this.scores = {};

    // canvas
    this.canvas = document.createElement('canvas');
    // attrs
    this.canvas.width = 400;
    this.canvas.height = 300;
    this.canvas.className = 'board';

    // context
    this.ctx = this.canvas.getContext('2d');

    // new snake for the board
    this.snake = new Snake(this.ctx, this.food);
};


/**
 * drawScoreBoard
 *
 * @returns {Canvas}
 */
Canvas.prototype.drawBoard = function () {

    var list = document.createElement('ul');

    list.className = 'score';

    _.forEach(['highScore', 'gameScore'], function (key) {

        this.scores[key] = document.createElement('li');
        this.scores[key].className = key;
        this.scores[key].innerHTML = 0;

        list.appendChild(this.scores[key]);
    }, this);

    this.scores.highScore.innerHTML = 'High score: ' + this.highScore;

    document.body.appendChild(list);
    document.body.appendChild(this.canvas);

    return this;
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
 *
 * @returns {Canvas}
 */
Canvas.prototype.setFood = function () {

    var coordinates = {
        x: _.random(390, 10),
        y: _.random(140, 10)
    };

    while (this.snake.isInSnakeTail(coordinates)) {
        coordinates.x = _.random(390, 10);
        coordinates.y = _.random(140, 10);
    }

    this.food.x = coordinates.x;
    this.food.y = coordinates.y;

    return this.drawFood();
};


/**
 * drawFood
 *
 * @returns {Canvas}
 */
Canvas.prototype.drawFood = function () {

    this.ctx.beginPath();
    this.ctx.rect(this.food.x, this.food.y, 10, 10);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();

    return this;
};


/**
 * speedUpSnake
 * speeds up the refresh rate and in turn speeds up the snake
 */
Canvas.prototype.speedUpSnake = function () {
    this.speed -= 0.1;
};


/**
 * updateScore
 *
 * @param type {String}
 * @param score {Number}
 */
Canvas.prototype.updateScore = function (type, score) {

    var el = this.scores[type],
        prefix = '';

    if (type === 'highScore') {
        prefix = 'High score: ';
    }

    if (el) {
        el.innerHTML = prefix + (score || this[type].toString());
    }
};

/**
 * gameOver
 */
Canvas.prototype.gameOver = function () {

    this.clear();

    this.ctx.font = "70px Arial";
    this.ctx.fillText("Game Over!", 10, 150);

    if (+this.gameScore > +this.highScore) {
        _.trigger('change:score', 'highScore', this.gameScore);

        localStorage.setItem('highScore', this.gameScore);
    }
};
