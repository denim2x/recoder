"use strict";
let $, Atom = require("atom");

class RangeFinder {
  constructor (editor) {
    $.put(Object.const(this, {editor}));
  }

  static rangesFor (editor) {
    return new RangeFinder(editor).ranges;
  }

  get ranges () {
    let ranges = this.editor.getSelectedBufferRanges();
    ranges = ranges.filter(range => range.isEmpty() == false);
    if (ranges.length == 0) {
      ranges = [this.editor.getBuffer().getRange()];
    }
    return ranges.map($(this).sortableRangeFrom);
  }

  _sortableRangeFrom (range) {
    let
      startRow = range.start.row,
      startCol = 0,
      endRow = range.end.row;

    if (range.end.column == 0) {
      endRow--;
    }

    let endCol = this.editor.lineTextForBufferRow(endRow).length;
    return new Atom.Range([startRow, startCol], [endRow, endCol]);
  }
}

$ = new require("assortment").Cellar(RangeFinder);
module.exports = RangeFinder;

