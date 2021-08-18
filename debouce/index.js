// 请实现一个函数 print(msg)，效果是将msg打印出来，但打印效果每秒内最多触发一次，多余的调用将被忽略。例如下面的代码：1和4会被打印出来，2和3不会被打印。

function debounce () {
  let time = null
  return (...args) => {
    let nTime = +new Date()
    if (!time) console.log(...args)
    if (time && nTime - time >= 1000) {
      console.log(...args)
    }
    time = nTime
  }
}

const print = debounce()
print(1)
print(2)
print(3)
print(4)

setTimeout(() => {
  print(5)
}, 2000)


