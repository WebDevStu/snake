/**
 * Snake Class
 *
 * @constructor
 */
var Snake = function (ctx) {

    _.listenTo({
        'change:direction': 'setDirection'
    }, this);

    this.ctx = ctx;
    this.tail = [{
        x: 198,
        y: 148
    }];

    // 0 = left, 1 = up, 2 = right, 3 = down;
    this.direction = 1;

    this.createSegment();
};


/**
 * move
 * called from the Canvas class passing a direction of travel, appends a segment
 * to the start of the tail array and removes from the end
 */
Snake.prototype.move = function () {

    var first = this.tail[0],
        coordinates = {
            x: first.x,
            y: first.y
        };

    switch (this.direction) {

        case 0:
            coordinates.x = first.x - 4;
            break;

        case 1:
            coordinates.y = first.y - 4;
            break;

        case 2:
            coordinates.x = first.x + 4;
            break;

        case 3:
            coordinates.y = first.y + 4;
            break;
    }

    // add to start of tail
    this.tail.unshift(coordinates);

    // remove last if no food eaten
    this.tail.pop();

    // finally redraw
    this.drawSnake();
};


/**
 * drawSnake
 */
Snake.prototype.drawSnake = function () {

    _.forEach(this.tail, function (config) {
        this.createSegment(config.x, config.y);
    }, this);
};


/**
 * createSegment
 * creates a section of the snake
 *
 * @param x
 * @param y
 */
Snake.prototype.createSegment = function (x, y) {

    x = x || 198;
    y = y || 148;

    this.ctx.beginPath();
    this.ctx.rect(x, y, 4, 4);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
};


/**
 * setDirection
 * sets the direction based on the key pressed
 * @param keyCode {Number}
 */
Snake.prototype.setDirection = function (keyCode) {

    // 37 = left, 38 = up, 39 = right, 40 = down
    var dir = ['up', 'right', 'down', 'left'],
        index = keyCode - 37;

    if (index >= 0 && index <= 3) {
        this.direction = index;
    }
};