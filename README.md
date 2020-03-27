# livolo
Nodejs library for [livolo](http://us.livolo.com/) rf enabled switches to use with raspberry pi and 433 MHz rf transmitter.

Based off of [crankru's library](https://github.com/crankru/nodejs-livolo).
Key differences are:
* supports all major node versions
* does not require root privileges

Depending on [rpio](https://github.com/jperkin/node-rpio) to support all major versions of node.
Livolo uses physical pin numbering for gpio. Consult [rpio](https://github.com/jperkin/node-rpio) documentation for further details.
## Installation
```
npm install livolo
```
## Options
`debugMode` - display debug info in the console

`repeats` - the number of times to repeat the command over radio

## Example
```
var Livolo = require('livolo');

var pin = 22; //physical pin number on raspberry pi gpio

var options = {
  debugMode: true,
  repeats: 150
}

Livolo.open(pin, options);
Livolo.sendButton(6400, 120);
```

## Typical workflow for starters

`remoteID` is the id of the virtual remote control. There are two types: small ones with 4 buttons and fullsized ones. `6400` is the id of a fullsized one. You can see the keycodes for fullsize remote in the very bottom of a readme.
`keycode` is the id of a button on a given virtual remote control, so one `remoteID` has several valid `keycode`s, all of them are listed in the last section of the readme.

The typical workflow is the following:
1. set your switch in learning mode.
2. send a command from rpi with chosen parameters, e.g. `remoteID: 6400 keycode: 120` which corresponds to fullsized virtual remote control and button no. 3.
3. if the switch received the signal it should memorize your remote now. To change the state of the switch from now on you will send these args `Livolo.sendButton(6400, 120)`
4. if you have another switch you wish to pair, pick another button on the remote, for example  `Livolo.sendButton(6400, 96)` would correspond to button no. 2 on the same remote.

You can continue adding switches to the same remoteId while you have valid button codes (below the readme). If you exhaust all of those you can always switch to a new remoteId and continue from step 1 with it.

The advantage of having all your switches on one `remoteId` (although you don't have to do that) is that you can send `Livolo.sendButton(6400, 106)` which corresponds to `OFF` button and turn off all the switches that were paired to that `remoteId` simultaneously.

## Signal and key codes

Tested remote IDs:

- 6400; 19303; 10550; 8500; 7400

Remote ids for fullsize remotes can be derived from
```
1 + 3*remote_index
```
All the other ids should correspond to mini (4-buttons) remotes

Keycodes for 4-buttons remotes:
```
#A: 8, #B: 16, #C: 56, #OFF: 42
```

Keycodes for fullsize remote:
```
#1: 0, #2: 96, #3: 120, #4: 24, #5: 80, #6: 48, #7: 108, #8: 12, #9: 72; #10: 40, #OFF: 106
#scene1: 90, #scene2: 114, #scene3: 10, #scene4: 18
#dimmer+L: 92, #dimmer-L: 116, #dimmer+R: 126, #dimmer-R: 26
```
