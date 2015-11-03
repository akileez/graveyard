// converts "value" to string if it's not one. An empty string is
// returned for "null" or "undefined" values

function baseToString (value) {
  if (typeof value == 'string') return value
  return value == null ? '' : (value + '')
}

module.exports = baseToString
