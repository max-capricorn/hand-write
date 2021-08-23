/**
* 执行深比较来确定两者的值是否相等
* var obj1 = { 'a': 1 };
* var obj2 = { 'a': 1 };
* isEqual(obj1, obj2);
*/

function isEqual (obj1, obj2) {
  if (obj1.constructor !== obj2.constructor) return false
  if (obj1 === obj2) return true
  const keys = Object.getOwnPropertyNames(obj1)
  for (let i = 0; i < keys.length; i++) {
    if (!isEqual(obj1[keys[i]], obj2[keys[i]])) return false
  }
  return true
}
isEqual({ 'a': 1 }, { 'a': 1 })

