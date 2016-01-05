/**
 * Canvas class
 *
 * @constructor
 */
var Canvas = function () {

    // canvas
    this.canvas = document.createElement('canvas');
    // attrs
    this.canvas.height = 400;
    this.canvas.width = 300;
    this.canvas.className = 'board';

    // context
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    // listen events
    _.listenTo({
        'frame:change': 'draw'
    }, this);
};


Canvas.prototype.draw = function () {

    console.log('rofl', this);
};