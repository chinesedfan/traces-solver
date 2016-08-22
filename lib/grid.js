/**
 * Initialize the grid with the same element
 *
 * @param {Number} n - the number of rows and columns
 * @param {[type]} ele - if it is a function, use its return value
 * @return {Array} nxn
 */
exports.initGrid = function(n, ele) {
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push([]);
        for (var j = 0; j < n; j++) {
            if (typeof ele === 'function') {
                result[i].push(ele(i, j));
            } else {
                result[i].push(ele);
            }
        }
    }
    return result;
}

/**
 * Do something with each element, if the iterator returns false, break the loop
 *
 * @param {Array} grid - NxN
 * @param {Function} iterator
 * @return {Boolean} whether each element is visited
 */
exports.traverseGrid = function(grid, iterator) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            if (!iterator(i, j, grid[i][j])) return false;
        }
    }
    return true;
}

/**
 * Do something with elements that between the pair, if the iterator returns false, break the loop
 * neither includes the source nor the destination
 *
 * @param {Number} x1 - row index of the source
 * @param {Number} y1 - column index of the source
 * @param {Number} x2 - row index of the destination
 * @param {Number} y2 - column index of the destination
 * @return {Boolean} whether each element is visited
 */
exports.traversePair = function(x1, y1, x2, y2, iterator) {
    var x, y, max;
    if (x1 == x2) {
        for (y = Math.min(y1, y2) + 1, max = Math.max(y1, y2); y < max; y++) {
            if (!iterator(x1, y)) return false;
        }
    } else if (y1 == y2) {
        for (x = Math.min(x1, x2) + 1, max = Math.max(x1, x2); x < max; x++) {
            if (!iterator(x, y1)) return false;
        }
    } else {
        throw new Error('the pair is not in a horizontal/vertical line: '
                + '(' + x1 + ', ' + y1 + ') (' + x2 + ', ' + y2 +')');
    }
    return true;
}
