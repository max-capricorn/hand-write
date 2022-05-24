

function settimeout (fn, delay, ...args) {
  const start = Date.now()
  let timer
  const loop = () => {
    timer = window.requestAnimationFrame(loop)

    const now = +new Date()

    if (now - start >= delay) {
      fn.call(null, args)
      cleartimeout(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

function setinterval (fn, delay, ...args) {
  let start = Date.now(), timer
  const loop = (step) => {
    window.requestAnimationFrame(loop)

    let now = Date.now()

    if (now - start >= delay) {
      start = now
      now = Date.now()
      fn.call(null, args)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}


function cleartimeout (id) {
  window.cancelAnimationFrame(id)
}

function clearinterval (id) {
  window.cancelAnimationFrame(id)
}

const a = setinterval(() => {
  console.log(12)
}, 1000)

const b = setinterval(() => {
  console.log(13)
}, 1000)

console.log('b: ', b);
console.log('a: ', a);