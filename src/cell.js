function Cell(x, y) {
    this.x = x;
    this.y = y;
}
Cell.prototype = {
    constructor: Cell
};

module.exports = Cell;
