class EventEmit {
  constructor (max) {
    this.listeners = {}
    this.maxListeners = max
  }
  on (event, listener) {
    const listeners = this.listeners
    if (listeners[event] && listeners[event].length >= this.maxListeners) return console.error(`${event}'s length is more then this's max ,${this.maxListeners}`)
    if (Array.isArray(this.listeners[event])) {
      if (this.listeners[event].indexOf(listener) === -1) {
        this.listeners[event].push(listener)
      }
    } else {
      this.listeners[event] = [listener]
    }
  }
  emit (event) {
    const args = Array.prototype.slice.call(arguments)
    args.shift()

    this.listeners[event].forEach(listener => {
      listener.call(null, args)
    })
  }
  addListener (event, listener) {
    this.on(event, listener)
  }
  once (event, listener) {
    const _this = this
    function fn () {
      const args = Array.prototype.slice.call(arguments)
      listener.call(null, args)
      _this.removeListener(event, fn)
    }
    this.on(event, fn)
  }
  removeListener (event, listener) {
    const listeners = this.listeners[event]
    const i = listeners.indexOf(listener)

    if (i > -1) {
      listeners.splice(i, 1)
    }
  }
  removeAllListeners (event) {
    this.listeners[event] = []
  }
  setMaxListeners (n) {
    this.maxListener = n;
  }
  listeners (event) {
    return this.listeners[event]
  }
}

const eventEmit = new EventEmit(2)

const cba = (a) => console.log(a)
const cb2 = () => console.log(2)
const cb3 = () => console.log(3)

eventEmit.addListener('add', cba)

eventEmit.addListener('add', cb2)

eventEmit.addListener('add', cb3)

eventEmit.emit('add')


// eventEmit.once('add', cb3)

// eventEmit.removeListener('add', cb3)

// eventEmit.emit('add', '1')

