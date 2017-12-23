var rpio = require('rpio');

var config = {
  debugMode: false,
  pinNumber: null,
  repeats: 150, //number of times to repeat the commands
  p_short: 110, // 110us works quite OK
  p_long: 290, // 300us works quite OK
  p_start: 520, // 520us works quite OK
  high: true,
  opened: false
}

var pulseLUT = [
  { level: rpio.LOW, p_length: config.p_start },
  { level: rpio.HIGH, p_length: config.p_start },
  { level: rpio.LOW, p_length: config.p_short },
  { level: rpio.LOW, p_length: config.p_long },
  { level: rpio.HIGH, p_length: config.p_short },
  { level: rpio.HIGH, p_length: config.p_long }
]

function selectPulse (inBit) {
  if (inBit === 0) {
    if (config.high === true) {
      sendPulse(2);
      sendPulse(4);
    } else {
      sendPulse(4);
      sendPulse(2);
    }
  } else {
    if (config.high === true) {
      sendPulse(3);
    } else {
      sendPulse(5);
    }

    config.high = !config.high; //next pulse is inverted
  }
}

function sendPulse (txPulse) {
  var pulse = pulseLUT[txPulse];

  rpio.write(config.pinNumber, pulse.level);
  rpio.usleep(pulse.p_length);
}

function debugMsg (msg) {
  if (!config.debugMode) return;

  console.log(msg);
}

var livolo = {
  open: function (pinNumber, options) {
    if (options) {
      config.debugMode = options.debugMode || false;
      config.repeats = options.repeats || 150;
    }

    if (config.opened) return;

    config.pinNumber = pinNumber;

    debugMsg('Pin: ' + config.pinNumber);

    rpio.open(pinNumber, rpio.OUTPUT, rpio.LOW);
    rpio.usleep(10); // first call has initialization lag
    config.opened = true;
  },

  // emulate key signal
  sendButton: function(remoteID, keycode) {
    if (!config.opened && config.pinNumber !== null) this.open(config.pinNumber);
    if (!config.opened) throw new Error('Trying to write with no pins opened');

    debugMsg("sendButton: remoteID: " + remoteID + " keycode: " + keycode);

    // how many times to transmit a command
    for (pulse= 0; pulse <= config.repeats; pulse++) {

      sendPulse(1); // Start
      config.high = true; // first pulse is always high

      // transmit remoteID
      for (i = 15; i >= 0; i--) {
        var txPulse = remoteID & (1 << i); // read bits from remote ID
        if (txPulse > 0) {
          selectPulse(1);
        } else {
          selectPulse(0);
        }
      }

      // transmit keycode
      for (i = 6; i >= 0; i--)
      {
        var txPulse = keycode & (1 << i); // read bits from keycode
        if (txPulse > 0) {
          selectPulse(1);
        } else {
          selectPulse(0);
        }
      }
    }

    rpio.write(config.pinNumber, rpio.LOW);
  },

  close: function () {
    rpio.close(config.pinNumber);
    config.opened = false;
  }
}

module.exports = livolo;