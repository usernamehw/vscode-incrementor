> This is a fork of https://github.com/nmsmith22389/vscode-incrementor

![Demo](https://raw.githubusercontent.com/usernamehw/vscode-incrementor/master/img/demo-main.gif)

## Contents
* [Features](#features)
  * [Numbers](#numbers)
  * [Enumerators](#enumerators)
  * [Multiple Selections](#multiple-selections)
* [Usage](#usage)
  * [Available Commands](#available-commands)
* [Extension Settings](#extension-settings)
  * [Keybindings](#keybindings)

## Features

### Numbers

![Numbers](https://raw.githubusercontent.com/usernamehw/vscode-incrementor/master/img/demo-number.gif)

Numbers can be incremented or decremented by 1, 0.1, or 10. This works with integers, decimals, and negatives alike. The only *real* condition is that it is a **finite** number.

### Enumerators

![Enumerators](https://raw.githubusercontent.com/usernamehw/vscode-incrementor/master/img/demo-enumerator.gif)

Enumerators can basically be any kind of text, like a variable or function or command.

**They can only contain letters, numbers and dashes and must start with a letter and can't end with a dash.**

In the extension settings you can add an array of strings that you want to cycle through. *i.e.* `["false", "true"]`

Each array will cycle through the containing strings from beginning to end and also loop back around if you have the option set. Each array is considered a separate enumerator so `"false"` can only become `"true"` and vice versa depending what the array contains.

### Multiple Selections

![Multiple Selections](https://raw.githubusercontent.com/usernamehw/vscode-incrementor/master/img/demo-multiple-selections.gif)

Incrementor supports multiple selections, even in the same line. They do not all have to be the same type, so one selection/cursor could be a number and another could be an enumerator.

## Usage

> **TIP:** Incrementing/decrementing can work with one or multiple cursors.<br>If there are no selections Incrementor will use the word under the caret(s) then select them.

For this example we will be incrementing a number.

1) Either select the number you wish to increment or just place the caret inside or next to the number.

2) Then, either press the hotkey that corresponds to the value you wish to increment by or open the Command Palette and use the command `Incrementor: Increment by X`.

3) Congratulations! You just **Incrementored** your first number!

### Available Commands

*In the Command Palette (Cmd+Shift+P)*

* `Incrementor: Increment by 1`
* `Incrementor: Decrement by 1`
* `Incrementor: Increment by 0.1`
* `Incrementor: Decrement by 0.1`
* `Incrementor: Increment by 10`
* `Incrementor: Decrement by 10`
* `Incrementor: Increment by custom value`

### Increment by custom value example:

> When command is executed from Command Palette - it will prompt for the custom value

```js
{
    "key": "ctrl+Up",
    "command": "incrementor.incByCustomValue",
    "args": 20
},
{
    "key": "ctrl+Down",
    "command": "incrementor.incByCustomValue",
    "args": -20
},
```

## Extension Settings

### `incrementor.decimalPlaces`

The number of decimal places to round incremented/decremented decimal numbers to.<br>*(a value of 0 will disable rounding)*

* **Default:** 0
* **Must be:** 0 to 10, Integer

### `incrementor.loopEnums`

After reaching the end of an Enum set, start back at the beginning.

* **Default:** true
* **Must be:** Boolean

### `incrementor.enums`

An array of arrays, each containing a list of enums to cycle through.

* **Default:** `[["false", "true"], ["let", "const"]]`
* **Must be:**
  ```
  Array >
    Arrays >
      Strings
  ```

### Keybindings

For now, default keybindings aren't being included but these are the ones I use.

```json
{
    "command": "incrementor.incByOne",
    "key": "ctrl+up"
},
{
    "command": "incrementor.decByOne",
    "key": "ctrl+down"
},
{
    "command": "incrementor.incByTenth",
    "key": "ctrl+alt+up"
},
{
    "command": "incrementor.decByTenth",
    "key": "ctrl+alt+down"
},
{
    "command": "incrementor.incByTen",
    "key": "ctrl+alt+cmd+up"
},
{
    "command": "incrementor.decByTen",
    "key": "ctrl+alt+cmd+down"
}
```
