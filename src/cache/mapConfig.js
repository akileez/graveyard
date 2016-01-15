// adopted from: map-config <https://github.com/doowb/map-config>
// Copyright (c) 2015, Brian Woodward. (MIT)

function MapConfig (app, config) {
  if (!(this instanceof MapConfig)) return new MapConfig(app, config)

  define(this, 'isMapConfig', true)

  this.app = app || {}
  this.keys = []
  this.aliases = {}
  this.config = {}

  if (config) {
    for (var key in config) {
      var val = config[key]
      if (typeof val === 'string') this.alias(key, val)
      else this.map(key, val)
    }
  }
}

MapConfig.prototype.map = function (key, val) {
  // allow passing another map-config object in as a value
  if (isMapConfig(val)) {
    this.map(key, function(config) {
      return val.process(config);
    })
    return this.addKey(key, val.keys)
  }

  if (typeof val !== 'function') {
    val = this.app[key]
  }

  this.config[key] = val
  this.addKey(key)
  return this
}

MapConfig.prototype.alias = function (alias, key) {
  this.aliases[alias] = key
  this.addKey(alias)
  return this
}

MapConfig.prototype.process = function (args) {
  args = args || {}
  var key

  for (key in this.aliases) {
    var alias = this.aliases[key]
    this.map(key, this.config[alias] || this.app[alias])
  }

  for (key in args) {
    if (typeof this.config[key] === 'function') {
      this.config[key].call(this.app, args[key])
    }
  }
}

MapConfig.prototype.addKey = function (key, arr) {
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

module.exports = MapConfig
