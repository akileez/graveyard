// sets 'value' to 'key' of the cache

function mapSet (key, value) {
  if (key != '__proto__') this.__data__[key] = value
  return this
}

module.exports = mapSet
