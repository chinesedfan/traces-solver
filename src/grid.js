var error = require('./error.js');
var EmptyCell = require('./emptycell.js');
var NumberCell = require('./numbercell.js');

function Grid(grid) {
    this.grid = grid;
    this.size = grid.length;

    this.validate();
    this.initCells();
    this.initCandidates();
    this.pruneCandidates();
}
Grid.prototype = {
    constructor: Grid,
    validate: function() {
    },
    initCells: function() {
        this.cells = [];

        var row;
        for (var i = 0; i < this.size; i++) {
            row = [];
            for (var j = 0; j < this.size; j++) {
                if (this.grid[i][j]) {
                    row.push(new NumberCell(i, j, this.grid[i][j]));
                } else {
                    row.push(new EmptyCell(i, j));
                }
            }
            this.cells.push(row);
        }
    },
    initCandidates: function() {
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                var cell = this.cells[i][j];
                if (cell instanceof EmptyCell) continue;

                this.setAsCandidate(cell);
            }
        }
    },
    setAsCandidate: function(cell) {
        var cells = this.cells;
        var i = cell.x, j = cell.y, value = cell.value;
        var offset, x, y;
        // to left
        for (offset = 1, x = i, y = j - offset; offset <= value && y >= 0; offset++, y--) {
            if (cells[x][y] instanceof NumberCell) break;
            cells[x][y].candidates.push({
                cell: cells[i][j],
                cost: offset,
                dir: '<'
            });
        }
        // to right
        for (offset = 1, x = i, y = j + offset; offset <= value && y < this.size; offset++, y++) {
            if (cells[x][y] instanceof NumberCell) break;
            cells[x][y].candidates.push({
                cell: cells[i][j],
                cost: offset,
                dir: '>'
            });
        }
        // to bottom
        for (offset = 1, x = i - offset, y = j; offset <= value && x >= 0; offset++, x--) {
            if (cells[x][y] instanceof NumberCell) break;
            cells[x][y].candidates.push({
                cell: cells[i][j],
                cost: offset,
                dir: 'v'
            });
        }
        // to top
        for (offset = 1, x = i + offset, y = j; offset <= value && x < this.size; offset++, x++) {
            if (cells[x][y] instanceof NumberCell) break;
            cells[x][y].candidates.push({
                cell: cells[i][j],
                cost: offset,
                dir: '^'
            });
        }
    },
    pruneCandidates: function() {
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                var cell = this.cells[i][j];
                if (cell instanceof NumberCell || cell.candidates.length != 1 || cell.assigned) continue;

                var picked = 0;
                var item = cell.candidates[picked];
                item.cell.loopToCell(cell, function(x, y, cost, dir) {
                    var other = this.cells[x][y];
                    other.candidates = [{
                        cell: item.cell,
                        cost: cost,
                        dir: dir
                    }];
                    other.picked = 0;
                    other.assigned = other != cell;

                    if (!other.assigned) {
                        item.cell.rest -= cost;
                    }
                    return true;
                }.bind(this));
            }
        }
    },

    solve: function() {
        this.forward = true;
        // find the first unpicked
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                var cell = this.cells[i][j];
                if (cell instanceof NumberCell || cell.picked >= 0) continue;

                this.cursor = {
                    x: i,
                    y: j
                };
                break;
            }
            if (this.cursor) break;
        }

        while (!this.stopped) {
            if (this.step()) {
                this.forward = true;
                this.moveNext();
            } else {
                this.forward = false;
                this.movePrev();
            }
        }

        if (this.cursor.x == 0 && this.cursor.y == 0) error('failed to solve');
    },
    print: function() {
        var result = [];
        for (var i = 0; i < this.size; i++) {
            if (i) result.push('\n');

            for (var j = 0; j < this.size; j++) {
                var cell = this.cells[i][j];
                result.push(cell.toString());
            }
        }
        console.log(result.join(''));
    },

    step: function() {
        var cell = this.cells[this.cursor.x][this.cursor.y];
        // ignore if it is a number
        if (cell instanceof NumberCell) return this.forward;
        // ignore if it is assigned by another cell
        if (cell.assigned) {
            if (!this.forward) {
                cell.unpick();
            }
            return this.forward;
        }

        var picked = cell.picked + 1;
        // no more candidates
        if (picked >= cell.candidates.length) {
            cell.unpick();
            return false;
        }

        var item = cell.candidates[picked];
        // check first
        var isOK = item.cell.loopToCell(cell, function(x, y, cost, dir) {
            var other = this.cells[x][y];
            if (other == cell) {
                return item.cell.rest >= cost;
            } else {
                return other.picked < 0;
            }
        }.bind(this));
        if (!isOK) return false;

        // update later
        item.cell.loopToCell(cell, function(x, y, cost, dir) {
            var other = this.cells[x][y];
            if (other == cell) {
                other.picked = picked;
            } else {
                for (var i = 0; i < other.candidates.length; i++) {
                    if (other.candidates[i].cell == item.cell) {
                        other.picked = i;
                        other.assigned = true;
                        break;
                    }
                }
                if (i == other.candidates.length) error('cannot find');
            }
            return true;
        }.bind(this));
        return true;
    },
    movePrev: function() {
        if (this.stopped) error('already stopped');

        var c = this.cursor;
        if (c.y > 0) {
            c.y--;
        } else if (c.x > 0) {
            c.x--;
            c.y = this.size - 1;
        } else {
            this.stopped = true;
        }
    },
    moveNext: function() {
        if (this.stopped) error('already stopped');

        var c = this.cursor;
        if (c.y < this.size - 1) {
            c.y++;
        } else if (c.x < this.size - 1) {
            c.x++;
            c.y = 0;
        } else {
            this.stopped = true;
        }
    }
};

module.exports = Grid;
