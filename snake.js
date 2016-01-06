/**
 * Snake Class
 *
 * @constructor
 */
var Snake = function (ctx) {

    this.ctx = ctx;
    this.tail = [{
        x: 198,
        y: 148
    }];

    this.createSegment();
};


/**
 * move
 * called from the Canvas class passing a direction of travel, appends a segment
 * to the start of the tail array and removes from the end
 * @param direction
 */
Snake.prototype.move = function (direction) {

    // add to start (dependant of direction)
    this.tail.unshift({
        x: 100,
        y: 100
    });

    // remove last if no food eaten
    this.tail.pop();


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






Snake.prototype.add = function () {

};



