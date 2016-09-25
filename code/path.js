var findPath = function(startX, startY, endX, endY, sizeX, sizeY, pathMap, maxPath) {
    var loopStartX = startX;
    var loopStartY = startY;
    var loopEndX = startX;
    var loopEndY = startY;

    var getEmptyMap = function() {
        var map = [];
        for (var y = 0; y < sizeY; y++) {
            map[y] = [];
            for (var x = 0; x < sizeX; x++) {
                map[y][x] = 0;
            }           
        }
        return map;
    };

    var getResult = function(x, y) {
        return { x: x, y: y };
    };

    var map = getEmptyMap();
    map[startY][startX] = 1;

    var endPath = false;
    while (!endPath) {
        if (loopStartX < 0) { loopStartX = 0; }
        if (loopStartY < 0) { loopStartY = 0; }
        if (loopEndX >= sizeX) { loopEndX = sizeX - 1; }
        if (loopEndY >= sizeY) { loopEndY = sizeY - 1; }

        var noPath = true;
        for (var y = loopStartY; y <= loopEndY; y++) {
            for (var x = loopStartX; x <= loopEndX; x++) {
                if ((map[y][x] != 0) 
                && ((pathMap[y][x]) || ((x == startX) && (y == startY)))) {
                    /* ------ X - 1 ------ */
                    if ((x - 1 >= 0)
                    && ((pathMap[y][x - 1]) || ((x - 1 == endX) && (y == endY)))
                    && ((map[y][x - 1] == 0) || (map[y][x - 1] > map[y][x] + 1))) {
                        map[y][x - 1] = map[y][x] + 1;
                        noPath = false;
                    }
                    /* ------ X + 1 ------ */
                    if ((x + 1 < sizeX)
                    && ((pathMap[y][x + 1]) || ((x + 1 == endX) && (y == endY)))
                    && ((map[y][x + 1] == 0) || (map[y][x + 1] > map[y][x] + 1))) {
                        map[y][x + 1] = map[y][x] + 1;
                        noPath = false;
                    }
                    /* ------ Y - 1 ------ */
                    if ((y - 1 >= 0)
                    && ((pathMap[y - 1][x]) || ((x == endX) && (y - 1 == endY)))
                    && ((map[y - 1][x] == 0) || (map[y - 1][x] > map[y][x] + 1))) {
                        map[y - 1][x] = map[y][x] + 1;
                        noPath = false;
                    }
                    /* ------ Y + 1 ------ */
                    if ((y + 1 < sizeY)
                    && ((pathMap[y + 1][x]) || ((x == endX) && (y + 1 == endY)))
                    && ((map[y + 1][x] == 0) || (map[y + 1][x] > map[y][x] + 1))) {
                        map[y + 1][x] = map[y][x] + 1;
                        noPath = false;
                    }
                    /* ------------------- */
                    if (map[y][x] > maxPath) { noPath = true; } 
                    if (map[endY][endX] > 0) { endPath = true; }
                }
            }
        }

        if (noPath) { return getResult(0, 0); }

        loopStartX--;
        loopStartY--;
        loopEndX++;
        loopEndY++;
    }
    
    var currentX = endX;
    var currentY = endY
    var lastX = endX;
    var lastY = endY;

    while (true) {
        if ((currentY - 1 >= 0)
        && (map[currentY - 1][currentX] == map[currentY][currentX] - 1)) {
            currentY = currentY - 1;
        }
        else if ((currentX - 1 >= 0)
        && (map[currentY][currentX - 1] == map[currentY][currentX] - 1)) {
            currentX = currentX - 1;
        }
        else if ((currentY + 1 < sizeY)
        && (map[currentY + 1][currentX] == map[currentY][currentX] - 1)) {
            currentY = currentY + 1;
        }
        else if ((currentX + 1 < sizeX)
        && (map[currentY][currentX + 1] == map[currentY][currentX] - 1)) {
            currentX = currentX + 1;
        }
        else { return getResult(0, 0); }
        /* ------ Return first step ------ */
        if ((currentX == startX) && (currentY == startY)) {
            return getResult(lastX - startX, lastY - startY);
        }

        lastX = currentX;
        lastY = currentY;
    }

    return getResult(0, 0);
};
var findNearestPoint = function(startX, startY, sizeX, sizeY, pathMap) {
    var MAX_DIFFERENCE = 5;
    var loopStartX = startX;
    var loopStartY = startY;
    var loopEndX = startX;
    var loopEndY = startY;
    var difference = 0;
    if (pathMap[startY][startX]) { return { x: startX, y: startY }; }
    while (difference < MAX_DIFFERENCE) {
        if (loopStartX < 0) { loopStartX = 0; }
        if (loopStartY < 0) { loopStartY = 0; }
        if (loopEndX >= sizeX) { loopEndX = sizeX - 1; }
        if (loopEndY >= sizeY) { loopEndY = sizeY - 1; }
        for (var y = loopStartY; y <= loopEndY; y++) {
            for (var x = loopStartX; x <= loopEndX; x++) {
                if (pathMap[y][x]) {
                    return { x: x, y: y };
                }
            }
        }
        loopStartX--;
        loopStartY--;
        loopEndX++;
        loopEndY++;
        difference++;
    }
    return null;
};
var getPointsDistance = function(startX, startY, endX, endY) {
    var deltaX = Math.abs(startX - endX);
    var deltaY = Math.abs(startY - endY);
    return Math.round(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
};