var assert = require('assert');
var GridUtils = require('../lib/grid');
var Solver = require('../index');

describe('traces solver', function() {
    it('2x2', function() {
        var grid = GridUtils.initGrid(2, 0);
        grid[0][1] = 1;
        grid[1][0] = 1;

        assert.equal(printResult(Solver(grid)), '<1\n1>');
    });
    it('3x3', function() {
        var grid = [
            [0, 0, 2],
            [0, 1, 0],
            [3, 0, 0]
        ];

        assert.equal(printResult(Solver(grid)), '<<2\n^1>\n3>>');
    });
});

function printResult(cells) {
    var result = [];
    GridUtils.traverseGrid(cells, function(i, j) {
        if (j == 0) {
            result.push(cells[i].join(''));
        }
        return true;
    });
    return result.join('\n');
}
