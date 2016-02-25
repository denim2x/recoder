"use strict";
const
  sort = require("polysort"),
  RangeFinder = require("./range-finder"),
  keys = ["reverse", "natural", "case"],
  map = Map.from({case: "case_insensitive"});

function Command (options, mode) {
  let keys = options.slice();
  options = {lang: options.lang, mode};
  for (let key of keys) {
    options[map.poke(key)] = true;
  }

  return function command () {
    let editor = atom.workspace.getActiveTextEditor();
    for (let range of RangeFinder.rangesFor(editor)) {
      let text = editor.getTextInBufferRange(range);
      text = sort(text, options);
      editor.setTextInBufferRange(range, text);
    }
  };
}

module.exports = {
  activate () {
    let
      all_options = Array.power(keys),
      commands = {};

    for (let unit of sort.units) {
      for (let options of all_options) {
        let name = ["recoder"].concat(options);
        name = `${name.join("-")}:${unit.name}`;
        options.lang = unit.name;

        if (unit) {
          for (let mode of unit.modes) {
            commands[`${name}-${mode}`] = new Command(options, mode);
          }
        } else {
          commands[name] = new Command(options);
        }
      }
    }

    atom.commands.add("atom-text-editor:not([mini])", commands);
  },

  keys
};
