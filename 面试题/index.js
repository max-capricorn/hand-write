// async function as1 () {
//   console.log("as1 start");
//   await as2();
//   console.log("as1 end"); //v
// }

// async function as2 () {
//   console.log("as2");
//   await as3()
// }

// async function as3 () {
//   await as4()
//   console.log('as3') // v
// }

// async function as4 () {
//   console.log('as4')
// }

// console.log("script start");

// setTimeout(function () {
//   console.log("setTimeout");
// }, 0);

// as1();

// new Promise(function (resolve) {
//   console.log("prom1");
//   resolve();
// }).then(function () {
//   console.log("prom2"); // v
// });
// console.log("script end");
// script start
// index.js:2 as1 start
// index.js:8 as2
// index.js:18 as4
// index.js:30 prom1
// index.js:35 script end
// index.js:14 as3
// index.js:33 prom2
// index.js:4 as1 end
// index.js:24 setTimeout
//script start
// as1 start
// as2
// as4
// prom1
// script end
// as3
// prom2
// as1 end
// setTimeout


// Promise.allSettled

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promise3 = new Promise((resolve, reject) => setTimeout(reject, 100, 'wssss'));
const promises = [promise1, promise2, promise3];

const promiseAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    let len = promises.length,
      resCount = 0,
      result = [];
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        resCount++
        result[i] = {
          status: "fulfilled",
          value: data
        }
        if (resCount === len) {
          resolve(result)
        }
      }).catch(err => {
        resCount++
        result[i] = {
          status: "rejected",
          reason: err
        }
        if (resCount === len) {
          resolve(result)
        }
      })
    }
  })
}

promiseAllSettled(promises).
  then((results) => {
    console.log('results: ', results);
  })
