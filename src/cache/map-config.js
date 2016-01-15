var stampit  = require('../object/stampit')

module.exports = stampit()
  .methods({
    map: map,
    alias: alias,
    process: process,
    addKey: addKey
  })
  .init([
    function (cfg) {
      define(this, 'isMapConfig', true)
      this.app = {}
      this.keys = []
      this.aliases = {}
      this.cfg = {}

      if (cfg) {
        for (var key in cfg) {
          var val = cfg[key]
          if (typeof val === 'string') this.alias(key, val)
          else this.map(key, val)
        }
      }
    }
  ])

function map (key, val) {
  // allow passing another map-config object in as a value
  if (isMapConfig(val)) {
    this.map(key, function(cfg) {
      return val.process(cfg);
    })
    return this.addKey(key, val.keys)
  }

  if (typeof val !== 'function') {
    val = this.app[key]
  }

  this.cfg[key] = val
  this.addKey(key)
  return this
}

function alias (alias, key) {
  this.aliases[alias] = key
  this.addKey(alias)
  return this
}

function process (args) {
  args = args || {}
  var key

  for (key in this.aliases) {
    var alias = this.aliases[key]
    this.map(key, this.cfg[alias] || this.app[alias])
  }

  for (key in args) {
    if (typeof this.cfg[key] === 'function') {
      this.cfg[key].call(this.app, args[key])
    }
  }
}

function addKey (key, arr) {
  var idx = this.keys.indexOf(key)
  if (Array.isArray(arr)) {
    if (idx === -1) {
      this.keys = this.keys.concat(arr.map(function(val) {
        return [key, val].join('.')
      }));
    } else {
      this.keys.splice(idx, 1)
      var vals = arr.map(function(val) {
        return [key, val].join('.')
      })
      .filter(function(val) {
        return this.keys.indexOf(val) === -1
      }.bind(this))

      this.keys.push.apply(this.keys, vals)
    }
  } else if (idx === -1) {
    this.keys.push(key)
  }
  return this
}

function isMapConfig (val) {
  return val
    && typeof val === 'object'
    && val.isMapConfig === true
}

function define (obj, prop, val) {
  Object.defineProperty(obj, prop, {
    enumerable: false,
    configurable: true,
    value: val
  })
}

