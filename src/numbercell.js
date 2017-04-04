var Cell = require('./cell.js');

function NumberCell(x, y, value) {
    Cell.call(this, x, y);

    this.value = value;
    this.rest = value;
}
NumberCell.prototype = Object.assign({}, Cell.prototype, {
    constructor: NumberCell,
    toString: function() {
        return this.value;
    },

    loopToCell: function(cell, iterator) {
        var x1 = this.x, y1 = this.y;
        var x2 = cell.x, y2 = cell.y;

        var x, y;
        if (x1 == x2) {
            for (y = y1 + 1; y <= y2; y++) {
                if (!iterator(x1, y, y - y1, '>')) return false;
            }
            for (y = y1 - 1; y >= y2; y--) {
                if (!iterator(x1, y, y1 - y, '<')) return false;
            }
        } else if (y1 == y2) {
            for (x = x1 + 1; x <= x2; x++) {
                if (!iterator(x, y1, x - x1, 'v')) return false;
            }
            for (x = x1 - 1; x >= x2; x--) {
                if (!iterator(x, y1, x1 - x, '^')) return false;
            }
        } else {
            throw new Error('the pair is not in a horizontal/vertical line: '
                    + '(' + x1 + ', ' + y1 + ') (' + x2 + ', ' + y2 + ')');
        }
        return true;
    }
});

module.exports = NumberCell;
