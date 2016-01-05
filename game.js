

(function () {

    var canvas = new Canvas(),
        gameInPlay = true,
        render = function () {

            if (gameInPlay) {

                // do something here

                window.requestAnimationFrame(render);
            }
        };

    _.forEach({1:'1', 2:'2', 3:'3'}, function (val, label) {
        console.log(val, label);
    });

    // pause the game on blur
    window.addEventListener('blur', function () {
        gameInPlay = false;
    });

    // start again on focus
    window.addEventListener('focus', function () {

        gameInPlay = true;
        window.requestAnimationFrame(render);
    });


    // @TODO bind key events here


    // start the game
    window.requestAnimationFrame(render);
} ());
