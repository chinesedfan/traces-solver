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
        var grid = GridUtils.initGrid(3, function() {
            return 123;
        });
        GridUtils.traverseGrid(grid, function(i, j, ele) {
            assert.equal(ele, 123);
            return true;
        });
    });
});
describe('traverseGrid', function() {
    it('break', function() {
        var grid = GridUtils.initGrid(3, 123);
        var x = 0;
        GridUtils.traverseGrid(grid, function(i, j, ele) {
            x++;
            return x < 5;
        });
        assert(x, 5);
    });
});
