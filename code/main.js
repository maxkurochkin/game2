var testSize = {
    x: 10,
    y: 10
};

var testMap = [
    ['grass-1', 'grass-1', 'grass-1', 'grass-1', 'road-1', 'road-1', 'grass-1', 'grass-1', 'grass-1', 'grass-1'],
    ['grass-1', 'grass-1', 'grass-1', 'grass-1', 'road-1', 'road-1', 'grass-1', 'grass-1', 'grass-1', 'grass-1'],
    ['grass-1', 'grass-1', 'grass-1', 'grass-1', 'wood-1', 'wood-1', 'grass-1', 'grass-1', 'grass-1', 'grass-1'],
    ['grass-1', 'grass-1', 'water-1', 'water-1', 'bridge-1', 'bridge-1', 'water-1', 'water-1', 'grass-1', 'grass-1'],
    ['water-1', 'water-1', 'water-1', 'water-1', 'bridge-1', 'bridge-1', 'water-1', 'water-1', 'water-1', 'water-1'],
    ['water-1', 'water-1', 'water-1', 'grass-1', 'wood-1', 'wood-1', 'grass-1', 'water-1', 'water-1', 'water-1'],
    ['grass-1', 'grass-1', 'grass-1', 'grass-1', 'road-1', 'road-1', 'grass-1', 'grass-1', 'grass-1', 'grass-1'],
    ['grass-1', 'grass-1', 'grass-1', 'grass-1', 'road-1', 'road-1', 'road-1', 'grass-1', 'grass-1', 'grass-1'],
    ['grass-1', 'grass-1', 'grass-1', 'grass-1', 'road-1', 'road-1', 'road-1', 'grass-1', 'grass-1', 'grass-1'],
    ['grass-1', 'grass-1', 'grass-1', 'grass-1', 'grass-1', 'road-1', 'road-1', 'road-1', 'grass-1', 'grass-1']
];

var testPathMap = [
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, false, false, true, true, false, false, true, true],
    [false, false, false, false, true, true, false, false, false, false],
    [false, false, false, true, true, true, true, false, false, false],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true]
];

window.onload = function() {
    game.container = document.querySelector('#container');
    game.layers.bottom = BottomLayerClass(document.querySelector('#bottom'));
    game.layers.active = ActiveLayerClass(document.querySelector('#active'));
    game.layers.mouse = MouseLayerClass(document.querySelector('#mouse'));
    game.size.x = testSize.x;
    game.size.y = testSize.y;
    game.pathMap = testPathMap;
    game.layers.bottom.setMap(testMap);
    game.layers.bottom.drawMap();
    game.layers.active.setMap('test');
    game.start();
};