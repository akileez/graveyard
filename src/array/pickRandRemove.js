var randInt = require('../random/randInt')

// Was array/pick in mout.js. moved here as more inline with random functions

function pick (arr, nItems) {
  if (nItems != null) {
    var result = []
    if (nItems > 0 && arr && arr.length) {
      nItems = nItems > arr.length ? arr.length : nItems
      while (nItems--) {
        result.push(pickOne(arr))
      }
    }
    return result
  }
  return (arr && arr.length) ? pickOne(arr) : void (0)
}

function pickOne (arr) {
  var idx = randInt(0, arr.length - 1)
  return arr.splice(idx, 1)[0]
}

module.exports = pick
