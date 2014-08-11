/*!
 * term-cursor
 *
 * @author Towry Wang <http://towry.me>
 * @license MIT
 */

var util = require('util');

/**
 * Expose the objects
 */

module.exports = cursor = {
  VERSION: '0.0.1'
};

/**
 * Escaped characters
 * => use util.format to formt the string.
 */

var escs = {
  left: '\u001B[%dD',
  up: '\u001B[%dA',
  right: '\u001B[%dC',
  down: '\u001B[%dB',
  reset: '\u001Bc'
}

/**
 * The standard output
 */
var stdout = process.stdout;

/**
 * The factory
 *
 * @api private
 */
function factory(t) {
  return function (n) {
    if (n && typeof n !== 'number') {
      throw new Error('The param must be a number.');
    }

    if (!n || n === 0) {
      return this;
    }

    var escstr = util.format(escs[t], n);
    stdout.write(escstr);

    return this;
  }
}


/**
 * Move cursor left by n times
 *
 * @param {Number} n
 * @api public
 */
cursor.left = factory('left');
cursor.up = factory('up');
cursor.right = factory('right');
cursor.down = factory('down');

/**
 * Move to a spot
 *
 * @param {Number}
 * @api public
 */
cursor.move = function (x, y) {
  var moveX = x > 0 ? this.right : this.left;
  var moveY = y > 0 ? this.down : this.up;

  moveX(x);
  moveY(x);

  return this;
}

/**
 * Reset the terminal to initial state
 *
 * @api public
 */
cursor.reset = function () {
  stdout.write(escs.reset);

  return this;
}

/**
 * Write something to the terminal at current 
 * position of the cursor.
 *
 * @api public
 */
cursor.write = function (s) {
  return stdout.write(s), this;
}