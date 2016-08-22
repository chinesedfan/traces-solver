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
describe('traversePair', function() {
    var x, grid;
    beforeEach(function() {
        x = '';
        grid = GridUtils.initGrid(3, function(i, j) {
            return '' + (i * 3 + j);
        });
    });

    it('0,0 to 0,2', function() {
        GridUtils.traversePair(0,0, 0,2, function(i, j) {
            x += grid[i][j];
            return true;
        });
        assert.equal(x, '1');
    });
    it('0,0 to 2,0', function() {
        GridUtils.traversePair(0,0, 2,0, function(i, j) {
            x += grid[i][j];
            return true;
        });
        assert.equal(x, '3');
    });
    it('0,2 to 2,2', function() {
        GridUtils.traversePair(0,2, 2,2, function(i, j) {
            x += grid[i][j];
            return true;
        });
        assert.equal(x, '5');
    });
    it('2,0 to 2,2', function() {
        GridUtils.traversePair(2,0, 2,2, function(i, j) {
            x += grid[i][j];
            return true;
        });
        assert.equal(x, '7');
    });
});