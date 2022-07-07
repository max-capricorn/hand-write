

function getSequence (nums) {
  const n = nums.length;
  if (n <= 1) return n

  let dp = new Array(n).fill(1), ret = 1

  for (let i = 1; i < n; i++) {

    for (let j = i - 1; j > 0; j--) {
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1)
    }
    ret = Math.max(dp[i], ret)
  }
  return ret

}

console.log(getSequence([9, 1, 3, 0, 6, 7, 2]))