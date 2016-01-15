var deepExtend = require('./src/object/deepExtend')
var deepMixin = require('./src/object/deepMixin')

var obj1 = {
  class: 'keith',
  id: 'williams',
  git: 'akileez'
}

var obj2 = {
  class: 'gail',
  home: {
    address: 'trenton',
    number: 6093943997
  },
  pets: ['marce', 'nala']
}

var obj3 = {
  foo: 'bar',
  baz: {
    apple: 'computer',
    hardware: {
      phone: true,
      cpu: true,
      tablet: true
    }
  },
  dog: 'house',
  class: 'kaliaha'
}

var run1 = deepExtend(obj1, obj2, obj3)
// var run2 = deepExtend({}, obj2)
// var run3 = deepExtend({}, obj3)
console.log(run1)
console.log(obj1)
// console.log(run2)
// console.log(run3)