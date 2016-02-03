

(function () {

    var canvas = new Canvas(),
        gameInPlay = true,
        score = 0,
        render = function () {

            if (gameInPlay) {

                _.trigger('frame:change');
                window.requestAnimationFrame(render);
            }
        };

    // pause the game on blur
    window.addEventListener('blur', function () {
        gameInPlay = false;
    });

    // start again on focus
    window.addEventListener('focus', function () {
        gameInPlay = true;
        window.requestAnimationFrame(render);
    });

    // get key down events
    window.addEventListener('keydown', function (evt) {
        _.trigger('change:direction', evt.keyCode);
    }, false);


    _.listenTo({
        'food:eaten': function () {
            canvas.gameScore += 1;
            _.trigger('change:score', 'gameScore');
        },
        'game:over': function () {
            gameInPlay = false;
        }
    });

    // set the first food
    canvas
        .drawBoard()
        .setFood();

    // start the game
    window.requestAnimationFrame(render);
} ());
