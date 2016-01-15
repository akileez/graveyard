function namespace (name) {
  var Emitter = require('../util/Emitter')
  var utils = require('./utils')
  var fns = []

  // Create an instance of `Base` with `options`
  function Base (config) {
    if (!(this instanceof Base)) return new Base(config)

    this.define('_callbacks', this._callbacks)
    this.options = this.options || {}
    this.cache = this.cache || {}

    if (name) this.[name] = {}
    if (typeof config === 'object') this.visit('set', config)
    utils.run(this, 'use', fns)
  }

  // Convenience method for assigning a `name` on the instance
  // for doing lookups in plugins
  function is (name) {
    this.define('is' + name, true)
    this.define('_name', name)
    return this
  }

  // Define a plugin function to be called immediately upon init.
  // Plugins are chainable and the only parameter exposed to the
  // plugin is the application instance.
  function use (fn) {
    fn.call(this, this)
    this.emit('use')
    return this
  }

  // Assign `value` to `key`. Also emits `set` with
  // the key and value.
  function set (key, val) {
    if (Array.isArray(key) && arguments.length === 2) key = utils.toPath(key)
    if (typeof key === 'object') this.visit('set', key)
    else {
      utils.set(name ? this[name] : this, key, val)
      this.emit('set', key, val)
    }
  }

  // Return the stored value of `key`. Dot notation may be used
  // to get [nested property values][get-value].
  function get (key) {
    key = utils.toPath(arguments)
    var val = name
      ? utils.get(this[name], key)
      : utils.get(this, key)

    this.emit('get', key, val)
    return val
  }

  // Return true if app has a stored value for `key`,
  // false only if `typeof` value is `undefined`.
  function has (key) {
    key = utils.toPath(arguments)
    var val = name
      ? utils.get(this[name], key)
      : utils.get(this, key)

    var hasit = typeof val !== 'undefined'
    this.emit('has', key, has)
    return hasit
  }

  function del (key) {
    if (Array.isArray(key)) this.visit('del', key)
    else {
      utils.del(name ? this[name] : this, key)
      this.emit('del', key)
    }

    return this
  }

  function define (key, value) {
    utils.define(this, key, value)
    return this
  }

  function visit (method, val) {
    utils.visit(this method, val)
    return this
  }

  function mixin (key, val) {
    Base.prototype[key] = val
    return this
  }

  Base.prototype = Emitter({
    constructor: Base,
    is: is,
    use: use,
    set: set,
    get: get,
    has: has,
    del: del,
    define: define,
    visit: visit,
    mixin: mixin
  })

  Base.use = function (fn) {
    fns.push.fn
  }

  Base.extend = utils.cu.extend(Base, function (Ctor, Parent) {
    Ctor.prototype.mixins = []
    Ctor.mixin = function (fn) {
      var mixin = fn(Ctor.prototype)
      if (typeof mixin === 'function') Ctor.prototype.mixins.push(mixin)
    }

    Ctor.prototype.mixin = function (key, value) {
      Ctor.prototype[key] = value
    }

    Ctor.mixins = function (Child) {
      utils.run(Child, 'mixin', Ctor.prototype.mixins)
    }
  })

  Base.prototype.mixins = Base.prototype.mixins || []
  Base.mixin = function (fn) {
    var mixin = fn(Base.prototype)
    if (typeof mixin === 'function') Base.prototype.mixins.push(mixin)
  }

  Base.mixins = function (Child) {
    utils.run(Child, 'mixin', Base.prototype.mixins)
  }

  Base.inherit = utils.cu.inherit
  return Base
}

module.exports = namespace()
module.exports.namespace = namespace
