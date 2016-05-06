'use strict';

const fs = require("fs");

/**
 * @param {RuleContext} context context
 * @param {XXX} options options
 * @return {XXX} XXX
 */
export default function(context, options = {}) {
  const homeDir = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

  const wordsFile = options.words_file || homeDir + "/.prohibited-word.txt";

  const {Syntax, getSource, RuleError, report} = context;
  return {
    [Syntax.Document](node) {
      return new Promise(resolve => {
        const text = getSource(node);

        fs.readFileSync(wordsFile).toString().split('\n').forEach(word => {
          if (text.indexOf(word) !== -1) {
            report(node, new RuleError(`Document contains NG word "${word}".`));
          }
        });

        resolve();
      });
    }
  };
}

