/* @flow */

import { assert } from 'invincible'
import parse from './parse'
import helpers from './helpers'

/**
 * Compile the source string, and return a executable function.
 *
 * @param {String} str
 * @param {Object} opts
 * @return {Function}
 */
function compile(str: string, opts: Object = {}): Function {
  let fn

  str = parse(str, opts)
  try {
    fn = new Function('locals', 'escapeHTML', str)
  } catch (e) {
    assert(e.name !== 'SyntaxError', 'an error occured when compiling')
    throw e
  }

  return function(locals: Object) {
    return fn(locals, helpers.escapeHTML)
  }
}

export default compile
