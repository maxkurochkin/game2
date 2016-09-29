var ActiveLayerClass = function(container) {
    var activeObjects = [];
    var runAnimationFrame = function() {
        setInterval(function() {
            for (var i = 0; i < activeObjects.length; i++) {
                activeObjects[i].action();
            }
        }, 60);
    }
    var object = {
        container: container,
        setMap: function(map) {
            game.player = PlayerClass(5, 2, 'test');
            activeObjects.push(game.player);
            activeObjects.push(AggressiveClass(9, 9, 'test'));
            runAnimationFrame();
        }
    };

    return object;
};