function getSecondInArray (nums) {
  if (nums.length === 0) return -1
  const map = new Map(), l = nums.length
  map.set(1, nums[0])
  map.set(2, nums[0])
  for (let i = 0; i < l; i++) {
    const item = nums[i];
    const first = map.get(1)
    const second = map.get(2)
    // 解决如果找到在循环过程已经找到 但是循环还没有结束 后面存在第二大数
    if (second < item) {
      map.set(2, item)
    }

    if (first < item) {
      map.set(1, item)
      map.set(2, first)
    }

  }
  return map.get(2)
}


const nums = [3, 222, 4, 1, 6, 7, 42, 7, 886, 990]

const sec = getSecondInArray(nums)

console.log(sec)