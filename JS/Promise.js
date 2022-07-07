const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

export default class MPromise {

  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      // setTimeout(() => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(callback => callback())
      }
      // })
    }

    const reject = (reason) => {
      // setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(callback => callback())
      }
      // })
    }

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者  
      executor(resolve, reject)
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error)
    }
  }

  resolve (value) {
    // if (this.status === PENDING) {
    //   this.status = FULFILLED
    //   this.fulfilledStack.push(value)
    // }
  }
  reject (reason) {
    // if (this.status === PENDING) {
    //   this.status = REJECTED
    //   this.rejectedStack.push(reason)
    // }
  }

  then (onFulfilled, onRejected) {
    if (this.status === FULFILLED) onFulfilled(this.value)
    if (this.status === REJECTED) onRejected(this.reason)
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }

  }

  all () {

  }
}




new Promise((resolve, reject) => {


})