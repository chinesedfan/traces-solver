var Cell = require('./cell.js');

function EmptyCell(x, y) {
    Cell.call(this, x, y);

    this.candidates = []; // {cell: NumberCell, cost: Number, dir: String}
    this.picked = -1;
    this.assigned = false; // whether assigned by another cell
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

    unpick: function() {
        this.picked = -1;
        this.assigned = false;
    }
});

module.exports = EmptyCell;
