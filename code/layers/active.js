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
        player: null,
        container: container,
        setMap: function(map) {
            object.player = PlayerClass(5, 5, 'test');
            activeObjects.push(object.player);
            activeObjects.push(AggressiveClass(9, 9, 'test'));
            runAnimationFrame();
        }
    };

    return object;
};