const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Mpromise {

  constructor (executor) {
    this.status = PENDING;
    this.reason = undefined;
    this.value = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = []

    let resolve = (value) => {
      if (value instanceof Mpromise) {
        return value.then(resolve, reject);
      }
      if (this.status = PENDING) {
        this.status = FULFILLED;
        this.value = value;
        
        this.onResolvedCallbacks.forEach(callback => callback())
      }
    }
    let reject = (reason) => {
      if (reason instanceof Mpromise) {
        return reason.then(resolve, reject);
      }
      if (this.status = PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach(callback => callback())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  static resolve (data) {
    return new Mpromise((resolve, reject) => {
      resolve(data);
    })
  }
  
  static reject (data) {
    return new Mpromise((resolve, reject) => {
      reject(data)
    })
  }

  static all (values) {
    if (!Array.isArray(values)) {
      const type = typeof values;
      return new TypeError(`TypeError: ${type} ${values} is not iterable`)
    }

    return new Mpromise((resolve, reject) => {
      let resultArr = []
      let orderIndex = 0
      const processResultByKey = (value, index) => {
        resultArr[index] = value
        if (++orderIndex === values.length) {
          resolve(resultArr)
        }
      }

      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value && typeof value.then === 'function') {
          value.then(value => {
            processResultByKey(value, i)
          }, (err) => {
            reject(err) 
          })          
        } else {
          processResultByKey(value, i)
        }
      }
    })
  }

  static race (values) {
    if (!Array.isArray(values)) {
      const type = typeof values;
      return new TypeError(`TypeError: ${type} ${values} is not iterable`)
    }

    return new Mpromise((resolve, reject) => {
      for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (value && typeof value.then === 'function') {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }
    })
  }

  static allSettled (values) {
    if (!Array.isArray(values)) {
      const type = typeof values;
      return new TypeError(`TypeError: ${type} ${values} is not iterable`)
    }

    return new Mpromise((resolve, reject) => {
      let resultArr = [], count = values.length
      for (let i = 0; i < values.length; i++) {
        let value = values[i]
        if (value && typeof value.then === 'function') {
          value
            .then(result => {
              resultArr[i] = {status: 'fulfilled', value: result}
            }, reason => {
              resultArr[i] = { status: 'rejected', reason: reason }
            })
            .finally(() => {
              if (!--count) {
                resolve(resultArr)
              }
            })
        }
      }
    })
  }

  then (onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;

    onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r}

    let promise2 = new Mpromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)

            resolvePromise(promise2, x, resolve, reject)

          } catch (error) {
            reject(error)
          }
        },0)
      }
      
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        },0)
      }
  
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          },0)
        })
  
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          },0)
        })
      }
    })
    return promise2
  }

  catch (cb) {
    return this.then(null, cb)
  }
  
  finally (onFinally) {
    return this.then(value => {
      return Mpromise.resolve(onFinally()).then(() => value)
    }, reason => {
      return Mpromise.resolve(onFinally()).then((reason) => {throw reason})
    })
  }
}


function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('chaining cycle detected for promise #<Promise>'))
  }

  let called;

  if ((typeof x === 'object' && x !== null) || typeof x === 'function' ) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise2, y,resolve, reject)
        }, r => {
          if (called) return
          called = true;
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true;
      reject(err)
    }
  } else {
    resolve(x)
  }
}