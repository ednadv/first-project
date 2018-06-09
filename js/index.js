window.onload = function() {
    var game = new Game('canvas');
    game.start();

    document.onkeydown = function(event) {
        game.onKeyDown(event.keyCode);
    }
}    