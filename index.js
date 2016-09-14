var GridUtils = require('./lib/grid');
var Cells = require('./lib/cell');
var EmptyCell = Cells.EmptyCell;
var NumberCell = Cells.NumberCell;

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

    var c = {x: 0, y: 0, backward: false};
    while (!c.invalid) {
        if (tryToPlace(candidates, c)) {
            moveNext(n, c);
            c.backward = false;
        } else {
            movePrev(n, c);
            c.backward = true;
        }
    }
    return candidates;
}

function initCandidates(grid) {
    var result = GridUtils.initGrid(grid.length, function(i, j) {
        return grid[i][j] ? new NumberCell(i, j, grid[i][j]) : new EmptyCell(i, j);
    });
    GridUtils.traverseGrid(grid, function(i, j, value) {
        if (!value) return true;

        var offset, x, y;
        // to left
        for (offset = 1, x = i, y = j - offset; offset <= value && y >= 0; offset++, y--) {
            result[x][y].candidates.push(result[i][j]);
            result[x][y].distances.push(offset);
        }
        // to right
        for (offset = 1, x = i, y = j + offset; offset <= value && y < grid.length; offset++, y++) {
            result[x][y].candidates.push(result[i][j]);
            result[x][y].distances.push(offset);
        }
        // to bottom
        for (offset = 1, x = i - offset, y = j; offset <= value && x >= 0; offset++, x--) {
            result[x][y].candidates.push(result[i][j]);
            result[x][y].distances.push(offset);
        }
        // to top
        for (offset = 1, x = i + offset, y = j; offset <= value && x < grid.length; offset++, x++) {
            result[x][y].candidates.push(result[i][j]);
            result[x][y].distances.push(offset);
        }
        return true;
    });
    return result;
}
function pruneCandidates(cells) {
    GridUtils.traverseGrid(cells, function(i, j, cell) {
        if (cell instanceof NumberCell || cell.candidates.length != 1) return true;

        var target = cell.candidates[0];
        GridUtils.traversePair(target.x, target.y, i, j, function(x, y, off) {
            cell[x][y].candidates = [target];
            cell[x][y].distances = [off];
        });
        return true;
    });
}

function tryToPlace(candidates, c) {
    var item = candidates[c.x][c.y];
    // ignore if assigned by others
    if (item.target) return !c.backward;
    // ignore if it is a number
    if (item instanceof NumberCell) return !c.backward;

    if (c.backward && item.index >= 0) {
        // backward, recover the previous choice
        item.candidates[item.index].rest += item.cost;
        item.cost = 0;
    }
    
    item.index++;

    if (item.index >= item.candidates.length) {
        // no more candidates
        item.index = -1;
        return false;
    }

    var target = item.candidates[item.index];
    var backups = [];
    var isOk = GridUtils.traversePair(target.x, target.y, c.x, c.y, function(x, y, off, dir) {
        var other = candidates[x][y];
        if (other == item) {
            item.direction = dir;
            return true;
        }
        // check confirmed target
        if (other.target) return other.target == target;
        if (other.index >= 0) return other.candidates[other.index] == target;

        other.target = target;
        other.direction = dir;
        backups.push(other);

        return true;
    });

    if (!isOk || backups.length + 1 > target.rest) {
        for (var i = 0; i < backups.length; i++) {
            backups[i].target = null;
            backups[i].direction = '';
        }
        item.direction = '';
        return tryToPlace(candidates, c);
    }

    item.cost = backups.length + 1;
    target.rest -= item.cost;
    return true;
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

    if (c.y < n - 1) {
        c.y++;
    } else if (c.x < n - 1) {
        c.x++;
        c.y = 0;
    } else {
        c.invalid = true;
    }
}
