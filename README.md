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

- read from real remote IDs: 6400; 19303
- "virtual" remote IDs: 10550; 8500; 7400

Keycodes read from real remote:
```
#1: 0, #2: 96, #3: 120, #4: 24, #5: 80, #6: 48, #7: 108, #8: 12, #9: 72; #10: 40, #OFF: 106
```
