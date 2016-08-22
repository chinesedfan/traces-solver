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
                ele = ele(i, j);
            }
            result[i].push(ele);
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
