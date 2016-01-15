var eachAsync = require('./src/async/_each').each
var forEachOf = require('./src/async/eachOf')
var eachSeries = require('./src/async/_each').eachSeries
var eachOfSeries = require('./src/async/eachOfSeries')
var map = require('./src/async/_map').map
var mapSeries = require('./src/async/_map').mapSeries
var filter = require('./src/async/_filter').filter
var filters = require('./src/async/_filter').filterSeries
var zalgo = require('./src/async/ensureAsync')
var assert = require('assert')
var series = require('./src/async/series')
var arrEach = require('./src/base/arrEach')
var arrForEach = require('./src/array/forEach')
var glob = require('glob')
var mixin = require('./src/object/extend')
var path = require('path')
var nameOfDay = require('./src/date/nameOfDay')
var nameOfMonth = require('./src/date/nameOfMonth')
var baseCompareAscending = require('./src/base/baseCompareAscending')
var naturalCompare = require('./src/string/strNaturalCompare')
var isPlainObject = require('./src/lang/isPlainObject')
var compose = require('./src/function/compose')
var composite = require('./src/function/composite')
var fseries = require('./src/function/series')
var map = require('./src/array/map')
var arrfilter = require('./src/array/filter')
var isEven = require('./src/number/isEven')
var isOdd = require('./src/number/isOdd')

var defaults = ['one', 'two', 'three', 'four', 'five', 'six']
var obj = {
  one : 1,
  two : 2
}

function filez () {
  var globFilez = glob.sync('./src/lib/base/*.js')
  console.log(globFilez)
  series([
    function (callback) {
      var res = {}
      globFilez.forEach(function (val, key, arr) {
        var bname = path.basename(val, path.extname(val))
        var bpath = require(path.resolve(val))  //path.dirname(val) + '/' +  path.basename(val)
        res[bname] = bpath
      })
      // var globSet = globFilez.reduce(function (acc, fp) {
      // // console.log(acc, fp)
      // return mixin(acc, require(path.resolve(fp)))
      // }, {})
      callback(null, res)
    },
    function (callback) {
      callback(null, globFilez.length)
    }
  ], done2)
}

function display (item, callback) {
  console.log('Processing file ' + item)
  if (item.length > 4) {
    console.log('Item ' + item + ' length is greater than 4')
  }
  callback()
}

function display2 (item, idx, callback) {
  console.log('Processing file ' + item)
  if (idx > 4) {
    console.log('Item ' + item + ' is at position ' + idx)
  }
  callback()
}

function mapper (item, callback) {
  item = item + item
  callback(null, item)
}

function filterItems (item, callback) {
  callback(item.length > 3)
}

function filterItems2 (item, callback) {
  callback(item.length > 4)
}

function done (err) {
  assert.ifError(err)
  console.log('done')
}

function done2 (err, res) {
  assert.ifError(err)
  console.log(res)
}

function done3 (res) {
  console.log(res)
}


// series([
//   function (callback) {
//     eachAsync(defaults, display, done)
//     callback(null, 'apple')
//   },
//   function (callback) {
//     filter(defaults, filterItems, done3)
//     callback(null, 'pear')
//   }
// ], done2)

// filez()

// console.log(typeof done3)

// series([
//   eachAsync(defaults, display, done2),
//   filter(defaults, filterItems, done2)
// ], done2)

// eachAsync(defaults, display, done)
// forEachOf(defaults, display2, done)
// eachSeries(defaults, display, done)
// eachOfSeries(defaults, display2, done)
// map(defaults, mapper, done2)
// mapSeries(defaults, mapper, done2)
// filter(defaults, filterItems, done3)
// filters(defaults, filterItems2, done3)
console.log(nameOfDay(new Date(), 7))
// console.log(nameOfMonth(new Date(), 3))
// console.log('sNC ' ,naturalCompare('Apple', 'ape'))
// console.log('bCA ' ,baseCompareAscending('Apple', 'ape'))
// console.log('defaults : ', isPlainObject(defaults), defaults)
// console.log('obj      : ', isPlainObject(obj), obj)
function add2 (x) {return x + 2}
function sqr (x) {return(x * x)}
var apple = compose(add2, sqr)
var pear = composite(add2, sqr)
var initial = arrfilter(defaults, function (val, key, arr) {
  return (key < arr.length - 1)
})
var orange = fseries(add2, sqr)
// console.log('apple is: ', apple(3))
console.log('pear is: ', pear(3))
console.log('orange is: ', orange(3))
// console.log(arrForEach([3, 1], fseries(console.log, sqr)))
console.log(map([3, 1], function (x) {return add2(sqr(x))}))
console.log(initial)
var num1 =
console.log('is number ', num1, ' odd? ', isOdd(num1))
console.log('is number ', num1, ' even? ', isEven(num1))