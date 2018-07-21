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
debugMode - display debug info in the console
repeats - the number of times to repeat the command over radio

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

## Signal and key codes

sendButton function uses to arguments: remote ID and keycode. Typically, remote IDs are 16 bit unsigned values, but
not all of them are valid.

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
