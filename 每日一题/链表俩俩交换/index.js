// 两两交换链表： 1 -> 2 -> 3 -> 4 -> 5 -> null    2 -> 1 -> 4 -> 3 -> 5 -> null


function Node (val) {
  this.val = val;
  this.next = null;
}

function swapPairs (head) {
  if (head == null || head.next == null) return head
  let newHead = head.next
  head.next = swapPairs(newHead.next)
  newHead.next = head;
  return newHead
}

let node = new Node(1)
node.next = new Node(2)
node.next.next = new Node(3)
node.next.next.next = new Node(4)
node.next.next.next.next = new Node(5)

// console.log('node: ', node);
console.log(swapPairs(node))