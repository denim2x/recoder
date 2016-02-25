"use strict";
const main = "./lib/recoder";

if ("string"==typeof(process.versions["atom-shell"])) {   /*
  console.info = function (...args) {
    atom.notifications.addInfo(args.join('\n'), {dismissable: true});
  };    //*/
  module.exports = require(main);

} else {
  let
    text = "beta:\n# Alpha\nalpha:\n",
    Range = function (start, end) {
      Object.assign(this, {
        start: {
          row: start[0],
          col: start[1]
        },
        end: {
          row: end[0],
          col: end[1]
        },
        isEmpty () {
          return false;
        }
      });
    },
    range = new Range([0, 0], [3, 0]),
    lineText = {
      length: 6
    },
    buffer = {
      getRange () {
        return range;
      }
    },
    editor = {
      getBuffer () {
        return buffer;
      },
      getSelectedBufferRanges () {
        return [range];
      },
      getTextInBufferRange (range) {
        return text;
      },
      lineTextForBufferRow () {
        return lineText;
      },
      setTextInBufferRange (range, text_) {
        text = text_;
      }
    },
    commands;

  global.atom = {
    commands: {
      add (sel, commands_) {
        commands = commands_;
      }
    },
    workspace: {
      getActiveTextEditor () {
        return editor;
      }
    }
  };

  let path = require("path");
  let Module = require("module");
  let paths = Module._resolveLookupPaths("assortment", module)[1];
  paths.unshift(path.resolve(paths[0], "../lib/node_modules"));

  let id = "#atom";
  let cacheKey = JSON.stringify({request: id.slice(1), paths});
  Module._pathCache[cacheKey] = id;
  Module._cache[id] = {
    exports: {Range}
  };

  require(main).activate();

  let commands_ = Object.values(commands);
  module.exports = function (index, text_) {
    if (typeof index == "number") {
      commands_[index]();
    } else {
      commands[index]();
    }
    return text;
  };
}
