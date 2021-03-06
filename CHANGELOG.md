## 1.0.1 (2017-11-10)

### Bug fixes

Input rules no longer fire in blocks that have their `code` spec set to true.

## 0.23.0 (2017-09-13)

### Breaking changes

Schema-specific rule-builders `blockQuoteRule`, `orderedListRule`, `bulletListRule`, `codeBlockRule`, and `headingRule`, along with the `allInputRules` array, are no longer included in this module.

## 0.22.0 (2017-06-29)

### Bug fixes

Input rules with spaces in them now match any whitespace where the space is expected, to avoid mysteriously not working when a non-breaking space is present.

## 0.20.0 (2017-04-03)

### Breaking changes

The input rules [plugin](http://prosemirror.net/docs/ref/version/0.20.0.html#inputrules.inputRules) no longer implicitly binds backspace to undo the last applied rule.

### New features

This module now exposes a command [`undoInputRule`](http://prosemirror.net/docs/ref/version/0.20.0.html#inputrules.undoInputRule), which will revert an input rule when run directly after one was applied.

## 0.11.0 (2016-09-21)

### Breaking changes

Moved into a separate module.

You can now add this plugin multiple times to add different sets of
rules to an editor (if you want). It is not possible to change the set
of rules of an existing plugin instance.

[Rules](http://prosemirror.net/docs/ref/version/0.11.0.html#inputrules.InputRule) no longer take a `filter` argument.

The signature of the `handler` callback for a
[rule](http://prosemirror.net/docs/ref/version/0.11.0.html#inputrules.InputRule) changed.

