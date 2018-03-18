## traces-solver [![npm version](https://badge.fury.io/js/traces-solver.svg)](https://badge.fury.io/js/traces-solver) [![Build Status](https://travis-ci.org/chinesedfan/traces-solver.svg?branch=master)](https://travis-ci.org/chinesedfan/traces-solver) [![License](https://img.shields.io/github/license/chinesedfan/traces-solver.svg)][license]

Simple solver for the iOS game [logic traces](https://itunes.apple.com/us/app/logic-track-traces-puzzles/id1081609724).

The main idea is backtracking algorithm with little optimization. Please check test files for usage.

Hope a web page can be set up in the future!

```
var Grid = require('traces-solver').Grid;

var input = [
    [0, 0, 0, 0, 0, 0, 0, 4],
    [2, 0, 2, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 9, 0, 0, 0, 3, 0, 0],
    [2, 0, 0, 0, 0, 6, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 5],
    [0, 0, 0, 0, 5, 0, 2, 0]
];

var grid = new Grid(input);
// grid.debug = true;
grid.solve();
grid.print();
```

## License

[MIT][license]

[license]: https://github.com/chinesedfan/traces-solver/blob/master/LICENSE
