var BottomLayerClass = function(container) {
    var privateObject = {
        offset: {
            x: -46,
            y: -24
        },
        container: container,
        map: [],
        draw: function(x, y, type) {
            var coordinates = game.mapToScreen(x, y);
            var left = coordinates.x + privateObject.offset.x;
            var top = coordinates.y + privateObject.offset.y;
            var element = document.createElement('div');
            element.setAttribute('class', type);
            element.style['left'] = left + 'px';
            element.style['top'] = top + 'px';
            container.appendChild(element);

            if (settings.debug) {
                var debugElement = document.createElement('div');
                debugElement.style['left'] = (coordinates.x - 1) + 'px';
                debugElement.style['top'] = (coordinates.y - 1) + 'px';
                debugElement.style['width'] = '2px';
                debugElement.style['height'] = '2px';
                debugElement.style['background-color'] = '#00ff00';
                container.appendChild(debugElement);
            }
        }
    };

    var object = {
        types: [
            'grass-1',
            'water-1',
            'wood-1',
            'road-1',
            'bridge-1'
        ],
        setMap: function(map) {
            privateObject.map = map;
        },
        drawMap: function() {
            for (var y = 0; y < game.size.y; y++) {
                for (var x = game.size.x - 1; x >= 0; x--) {
                    var type = privateObject.map[y][x];
                    privateObject.draw(x, y, type);
                }
            }
        }
    };

    return object;
};