var Cell = require('./cell.js');

function EmptyCell(x, y) {
    Cell.call(this, x, y);

    this.candidates = []; // {cell: NumberCell, cost: Number, dir: String}
    this.picked = -1;
    this.assigned = false; // whether assigned by another cell
    this.already = 0; // how many cells already picked the same candidate(only valid if not assigned)
}

EmptyCell.prototype = Object.assign({}, Cell.prototype, {
    constructor: EmptyCell,
    toString: function() {
        if (this.picked < 0) {
            return '.';
        } else {
            return this.candidates[this.picked].dir;
        }
    },

    unpick: function(cells) {
        if (!this.assigned && this.picked >= 0) {
            var item = this.candidates[this.picked];
            item.cell.rest += item.cost - this.already;
            item.cell.loopToCell(this, function(x, y, cost, dir) {
                if (cost < this.already) return true;

                var other = cells[x][y];
                other.picked = -1;
                other.assigned = false;
                return true;
            }.bind(this));

            this.already = 0;
        }

        this.picked = -1;
        this.assigned = false;
    }
});

module.exports = EmptyCell;
