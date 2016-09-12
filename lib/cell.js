function Cell(x, y) {
    this.x = x;
    this.y = y;
}

function EmptyCell(x, y) {
    Cell.call(this, x, y);

    this.candidates = [];
    this.distances = [];
    this.index = -1;

    this.target = null;
    this.direction = '';
}
EmptyCell.prototype.toString = function() {
    return this.direction;
}

function NumberCell(x, y, count) {
    Cell.call(this, x, y);

    this.count = count;
    this.rest = count;
}
NumberCell.prototype.toString = function() {
    return this.count;
}

module.exports = {
    EmptyCell: EmptyCell,
    NumberCell: NumberCell
};
