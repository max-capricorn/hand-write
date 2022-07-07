

function Test (name) {
  this.name = name
}


const t1 = new Test('ws')



function Test1 (name) {
  this.name = name
}


function _new () {
  const target = {}
  let Constructor = [].shift.call(arguments)

  const protoType = Constructor.prototype

  target.__proto__ = protoType

  let res = Constructor.apply(target, arguments)

  return typeof res === 'object' ? res : target

}

const t2 = _new(Test1)