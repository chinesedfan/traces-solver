var assert = require('assert');
var GridUtils = require('../lib/grid');

describe('initGrid', function() {
    it('3x3 - 123', function() {
        var grid = GridUtils.initGrid(3, 123);
        assert.equal(grid.length, 3);
        assert.equal(grid[0].length, 3);

        GridUtils.traverseGrid(grid, function(i, j, ele) {
            assert.equal(ele, 123);
            return true;
        });
    });
    it('3x3 - func', function() {
        var grid = GridUtils.initGrid(3, function(i, j) {
            return i * 3 + j;
        });
        GridUtils.traverseGrid(grid, function(i, j, ele) {
            assert.equal(ele, i * 3 + j);
            return true;
        });
    });
});
describe('traverseGrid', function() {
    it('not break', function() {
        var grid = GridUtils.initGrid(3, 123);
        var x = 0;
        var isAll = GridUtils.traverseGrid(grid, function(i, j, ele) {
            x++;
            return true;
        });
        assert.equal(x, 3 * 3);
        assert.equal(isAll, true);
    });
    it('break', function() {
        var grid = GridUtils.initGrid(3, 123);
        var x = 0;
        var isAll = GridUtils.traverseGrid(grid, function(i, j, ele) {
            x++;
            return x < 5;
        });
        assert.equal(x, 5);
        assert.equal(isAll, false);
    });
});
