import { def } from '../utils/def'
const arrayProto = Array.prototype

const arrayMethod = Object.create(arrayProto)

const methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
]

methods.forEach(function (method) {
  const original = arrayProto[method]

  def(arrayMethod, method, function mutator (...args: any[]) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted: any
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) { ob.observeArray() }

    ob.dep.notify()
    return result
  })

})