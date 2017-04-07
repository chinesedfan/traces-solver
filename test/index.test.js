var assert = require('assert');
var GridUtils = require('../lib/grid');
var Grid = require('../').Grid;

describe('traces solver', function() {
    it('2x2', function() {
        var grid = GridUtils.initGrid(2, 0);
        grid[0][1] = 1;
        grid[1][0] = 1;

        assert.equal(getSolveResult(grid), '<1\n1>');
    });
    it('3x3', function() {
        var grid = [
            [0, 0, 2],
            [0, 1, 0],
            [3, 0, 0]
        ];

        assert.equal(getSolveResult(grid), '<<2\n^1>\n3>>');
    });
    it('4x4', function() {
        var grid = [
            [3, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 3],
            [3, 0, 0, 0]
        ];

        assert.equal(getSolveResult(grid), '3>>^\nv1>^\n<1<3\n3>>>');
    });
    it('8x8', function() {
        var grid = [
            [0, 0, 0, 0, 0, 0, 0, 4],
            [2, 0, 2, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 3, 0, 0, 0],
            [0, 9, 0, 0, 0, 3, 0, 0],
            [2, 0, 0, 0, 0, 6, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 5],
            [0, 0, 0, 0, 5, 0, 2, 0]
        ];

        assert.equal(getSolveResult(grid), [
            '^^^<<<<4',
            '2^2>^<3>',
            'v^<<3^v^',
            '<9>><3>^',
            '2v<<<6>^',
            'vv3>>v^^',
            'vvv1>v^5',
            '<<<<5>2v'
        ].join('\n'));
    });
});

function getSolveResult(input) {
    var grid = new Grid(input);
    grid.solve();
    return grid.print(true);
}
