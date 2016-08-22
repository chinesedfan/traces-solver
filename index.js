var GridUtils = require('./lib/grid');

/**
 * Main entry
 *
 * @param {Array} grid - contains NxN elements
 * @return {Array} the solved grid, whose elements are {x: x, y: y}
 */
module.exports = function(grid) {
    var n = grid.length;
    var candidates = initCandidates(grid);
    pruneCandidates(candidates);

    var c = {x: 0, y: 0};
    while (!c.invalid) {
        if (tryToPlace(candidates, c)) {
            moveNext(n, c);
        } else {
            movePrev(n, c);
        }
    }
    return candidates;
}

function initCandidates(grid) {
    var result = GridUtils.initGrid(grid.length, function() {
        return {index: 0, candidates: []};
    });
    GridUtils.traverseGrid(grid, function(i, j, ele) {
        if (!ele) return true;

        var offset, x, y;
        // to left
        for (offset = 1, x = i, y = j - offset; offset <= ele && y >= 0; y--) {
            result[x][y].candidates.push({x: i, y: j});
        }
        // to right
        for (offset = 1, x = i, y = j + offset; offset <= ele && y < grid.length; y++) {
            result[x][y].candidates.push({x: i, y: j});
        }
        // to bottom
        for (offset = 1, x = i - offset, y = j; offset <= ele && x >= 0; x--) {
            result[x][y].candidates.push({x: i, y: j});
        }
        // to top
        for (offset = 1, x = i + offset, y = j; offset <= ele && x < grid.length; x++) {
            result[x][y].candidates.push({x: i, y: j});
        }
        return true;
    });
    return result;
}
function pruneCandidates(grid) {
    GridUtils.traverseGrid(grid, function(i, j, ele) {
        if (ele.candidates.length != 1) return true;

        var target = ele.candidates[0];
        GridUtils.traversePair(i, j, target.x, target.y, function(x, y) {
            grid[x][y].candidates = [{x: target.x, y: target.y}];
        });
        return true;
    });
}

function tryToPlace(candidates, c) {
    var item = candidates[c.x][c.y];
    // ignore if it is a number
    if (!item.candidates.length) return true;
    // no more candidates
    if (item.index >= item.candidates.length) return false;

    var target = item.candidates[item.index];
    var backups = [];
    var isOk = GridUtils.traversePair(c.x, c.y, target.x, target.y, function(x, y) {
        var ele = candidates[x][y];
        backups.push({x: x, y: y});
        if (ele.target) return false;

        ele.target = target;
        return true;
    });

    if (!isOk) {
        for (var i = 0; i < backups.length; i++) {
            backups[i].target = null;
        }
    }
    return isOk;
}

function movePrev(n, c) {
    if (c.invalid) return;

    if (c.y > 0) {
        c.y--;
    } else if (c.x > 0) {
        c.x--;
        c.y = n - 1;
    } else {
        c.invalid = true;
    }
}
function moveNext(n, c) {
    if (c.invalid) return;

    if (c.y < n) {
        c.y++;
    } else if (c.x < n) {
        c.x++;
        c.y = 0;
    } else {
        c.invalid = true;
    }
}
