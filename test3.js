// var toolz = require('./index')
var initial = require('./src/array/initial')
var where  = require('./src/collection/where')
var pluck = require('./src/collection/pluck')
var omitValue = require('./src/object/omitValue')
var isObject = require('./src/lang/isObject')
var kindOf = require('./src/lang/kindOf')
var arrfilter = require('./src/array/filter')

// var obj1 = {
//   class: 'keith',
//   id: 'williams',
//   git: 'akileez'
// }

// var obj2 = {
//   class: 'gail',
//   home: {
//     address: 'trenton',
//     number: 6093943997
//   },
//   pets: ['marce', 'nala']
// }

// var obj3 = {
//   foo: 'bar',
//   baz: {
//     apple: 'computer',
//     hardware: {
//       phone: true,
//       cpu: true,
//       tablet: true
//     }
//   },
//   dog: 'house',
//   class: 'kaliaha'
// }

// var run1 = toolz.object.deepFillIn(obj1, obj2, obj3)
// var run2 = toolz.object.deepExtend({}, obj2)
// var run3 = toolz.object.deepExtend({}, obj3)
// console.log(run1)
// // console.log(obj1)
// console.log(run2)
// console.log(run3)
// var run4 = toolz.collection.each(obj1, function(key, val) {
//   console.log(key == 'class')
// })

var tmp = [1, 2, 3, 4, 5, "a", "b"]
console.log(initial(tmp))
var initializer = arrfilter(tmp, function (val, key, arr) {
  return (key < arr.length - 1)
})
console.log(initializer)

var data = [
  { name: "Dana", age: 30 },
  { name: "Yana", age: 20 },
  { name: "Zhana", age: 10 }
]

console.log(where(data, {age: 10}))

var users = [
  { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
  { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
];

console.log(pluck(where(users, { 'age': 36, 'active': false }), 'user'))

var obj = {foo: {bar: {baz: {a: 'b', c: 'd', e: 'f', g: 'h'}}}}
console.log(typeof obj)
console.log(isObject(obj))
console.log(kindOf(obj))
console.log(omitValue(obj, 'foo.bar.baz', ['a', 'c', 'g']))