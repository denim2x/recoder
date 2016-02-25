"use strict";
const
  keys = require("..").keys,
  map = Map.from({case: "case_insensitive"});

describe("recoder: commands", () => {
  let editor, editorView;
  beforeEach(() => {
    waitsForPromise(() => atom.workspace.open());
    runs(() => {
      editor = atom.workspace.getActiveTextEditor();
      editorView = atom.views.getView(editor);
    });
  });

  require("polysort/spec")({
    marshal (options) {
      let command = keys.filter(key => options[map.poke(key)] === true);
      command = ["recoder"].concat(command);
      command = `${command.join("-")}:${options.lang}`;
      if (String.takes(options.mode)) {
        command = `${command}-${options.mode}`;
      }
      this(command, (text) => {
        editor.setText(text);
        editor.selectAll();
        atom.commands.dispatch(editorView, command);
        return () => editor.getText();
      });
    },
    wrap: runs
  });
});
