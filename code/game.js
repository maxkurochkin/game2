var game = {
    container: null,
    pathMap: null,
    player: null,
    size: {
        x: 0,
        y: 0
    },
    layers: {
        bottom: null,
        active: null,
        top: null,
        mouse: null
    },
    start: function() {
        var width = game.mapToScreen(game.size.x - 1, game.size.y - 1).x + settings.draw.step.x;
        var height = game.mapToScreen(0, game.size.y - 1).y + settings.draw.step.y;
        game.container.style['width'] = width + 'px';
        game.container.style['height'] = height + 'px';
    },
    mapToScreen: function(x, y) {
        var stepX = settings.draw.step.x;
        var stepY = settings.draw.step.y;
        var reverseX = (game.size.x - 1) - x;

        return {
            x: stepX + (x * stepX) + (y * stepX),
            y: stepY + (y * stepY) + (reverseX * stepY)
        };
    },
    screenToMap: function(x, y) {
        var step = settings.draw.step.x;
        y *= settings.draw.step.x / settings.draw.step.y;
        var side = Math.sqrt(step * step * 2);
        var startX = game.size.x * side / 2;
        var startY = game.size.y * side / 2;
        var reverseX = (game.size.x + game.size.y) * step - x;
        var diagonalX = Math.sqrt(reverseX * reverseX * 2) + Math.sqrt(y * y * 2)
        var diagonalY = Math.sqrt(x * x * 2) + Math.sqrt(y * y * 2)
        
        return {
            x: Math.floor(game.size.x - ((diagonalX / 2 - startY) / side)),
            y: Math.floor((diagonalY / 2 - startX) / side)
        };
    }
};