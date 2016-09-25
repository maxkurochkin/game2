var MouseLayerClass = function(element) {
    var object = {
        element: element
    };

    object.element.addEventListener('click', function(event) {
        var coordinates = game.screenToMap(event.offsetX, event.offsetY);
        if (((coordinates.x >= 0) && (coordinates.x < game.size.x))
       	&& ((coordinates.y >= 0) && (coordinates.y < game.size.y))) {
        	game.layers.active.player.setTarget(coordinates.x, coordinates.y);
        }
    });

    return object;
};