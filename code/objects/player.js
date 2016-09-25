var PlayerClass = function(x, y) {
    /* ----------------- */
    /* --- Constants --- */
    /* ----------------- */
    var FRAME_COUNT_MOVE = 8;
    var FRAME_COUNT_ATTACK = 2;
    var TEMPLATE_TAG_STEP = '{step}';
    var TEMPLATES = {
        none: 'none',
        move: 'move-{step}',
        attack: 'attack-{step}'
    };
    var DISPLAY_MOVE_STEP = { 
        x: settings.draw.step.x / FRAME_COUNT_MOVE, 
        y: settings.draw.step.y / FRAME_COUNT_MOVE
    };
    var ACTIONS = {
        none: 0,
        move: 1,
        attack: 2
    };
    var DIRECTIONS = {
        left: { moveX: -1, moveY: 0, moveDisplayX: -1, moveDisplayY: 1, elementClass: 'left' },
        right: { moveX: 1, moveY: 0, moveDisplayX: 1, moveDisplayY: -1, elementClass: 'right' },
        top: { moveX: 0, moveY: -1, moveDisplayX: -1, moveDisplayY: -1, elementClass: 'top' },
        bottom: { moveX: 0, moveY: 1, moveDisplayX: 1, moveDisplayY: 1, elementClass: 'bottom' }
    };
    /* ----------------- */
    /* --- Variables --- */
    /* ----------------- */
    var element = null;
    var position = { x: x, y: y };
    var targetPosition = { x: x, y: y };
    var targetObject = null;
    var screenPosition = { x: 0, y: 0 };
    var currentAction = ACTIONS.none;
    var currentAnimation = { step: 0, elementClass: TEMPLATES.none };
    var currentDirection = DIRECTIONS.bottom;
    /* ----------------- */
    /* --- Functions --- */
    /* ----------------- */
    var stopAnimation = function() {
        currentAction = ACTIONS.none;
        currentAnimation.step = 0;
        currentAnimation.elementClass = TEMPLATES.none;
    };
    var updateElementClass = function() {
        element.setAttribute('class', [
            'active-human',
            currentDirection.elementClass,
            currentAnimation.elementClass
        ].join(' '));
    };
    var updateElementPosition = function() {
        element.style['left'] = Math.round(screenPosition.x) + 'px';
        element.style['top'] = Math.round(screenPosition.y) + 'px';
        element.style['z-index'] = Math.round(screenPosition.y);
    };
    var updateDisplayPositionByDirection = function() {
        screenPosition.x += currentDirection.moveDisplayX * DISPLAY_MOVE_STEP.x;
        screenPosition.y += currentDirection.moveDisplayY * DISPLAY_MOVE_STEP.y;
        updateElementPosition();
    };
    var getDirectionByMovePoint = function(moveX, moveY) {
        if ((moveX == -1) && (moveY == 0)) { return DIRECTIONS.left; }
        if ((moveX == 1) && (moveY == 0)) { return DIRECTIONS.right; }
        if ((moveX == 0) && (moveY == -1)) { return DIRECTIONS.top; }
        if ((moveX == 0) && (moveY == 1)) { return DIRECTIONS.bottom; }
    };
    var getMovePoint = function() {
        return findPath(
            position.x,
            position.y,
            targetPosition.x,
            targetPosition.y,
            game.size.x,
            game.size.y,
            game.pathMap,
            settings.maxPathMap.player
        );
    };
    var setDirectionByMovePoint = function(moveX, moveY) {
        currentDirection = getDirectionByMovePoint(moveX, moveY);
        updateElementClass();
    };
    var animateMove = function() {
        currentAnimation.elementClass = TEMPLATES.move.replace(TEMPLATE_TAG_STEP, currentAnimation.step);
        updateElementClass();
        updateDisplayPositionByDirection();
        currentAnimation.step++;
        if (currentAnimation.step == FRAME_COUNT_MOVE) {
            screenPosition = game.mapToScreen(position.x, position.y);
            updateElementPosition();
            stopAnimation();
        }
    };
    var animateAttack = function() {
        currentAnimation.elementClass = TEMPLATES.attack.replace(TEMPLATE_TAG_STEP, currentAnimation.step);
        updateElementClass();
        currentAnimation.step++;
        if (currentAnimation.step == FRAME_COUNT_ATTACK) {
            stopAnimation();
        }
    };
    var startMove = function() {
        var movePoint = getMovePoint();
        if ((movePoint.x != 0) || (movePoint.y != 0)) {
            setDirectionByMovePoint(movePoint.x, movePoint.y);
            if (game.pathMap[position.y + movePoint.y][position.x + movePoint.x]) {
                position.x += movePoint.x;
                position.y += movePoint.y;
                game.pathMap[position.y][position.x] = false;
                game.pathMap[position.y - movePoint.y][position.x - movePoint.x] = true;
                currentAction = ACTIONS.move;
                animateMove();
            }
        }
    };
    /* ----------------- */
    /* --- Interface --- */
    /* ----------------- */
    var object = {
        action: function() {
            if (currentAction == ACTIONS.move) { animateMove(); }
            else if (currentAction == ACTIONS.attack) { animateAttack(); }
            else {
                if ((position.x != targetPosition.x)
                || (position.y != targetPosition.y)) {
                    startMove();
                }
            }
        },
        getPosition: function() {
            return { x: position.x, y: position.y };
        },
        setTarget: function(x, y) {
            var point = findNearestPoint(x, y, game.size.x, game.size.y, game.pathMap);
            if (point !== null) {
                targetPosition.x = point.x;
                targetPosition.y = point.y;
            }
        }
    };
    /* ------------------- */
    /* --- Constructor --- */
    /* ------------------- */
    game.pathMap[y][x] = false;
    screenPosition = game.mapToScreen(x, y);
    element = document.createElement('div');
    updateElementClass();
    updateElementPosition();
    game.layers.active.container.appendChild(element);
    return object;
};