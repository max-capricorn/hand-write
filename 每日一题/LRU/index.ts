class LinkedDoubleList {
  public prev: LinkedDoubleList | null = null
  public next: LinkedDoubleList | null = null
  constructor(public key: number, public value: number) {
    this.key = key
    this.value = value
  }
}



class LRUCache {
  public max: number
  public dummyHead: LinkedDoubleList
  public dummyLast: LinkedDoubleList
  public hashMap: { [key: number]: LinkedDoubleList } = {}
  constructor(public capacity: number) {
    this.max = capacity

    this.dummyHead = new LinkedDoubleList(-1, -1)
    this.dummyLast = new LinkedDoubleList(-1, -1)

    this.dummyHead.next = this.dummyLast
    this.dummyHead.prev = this.dummyLast
    this.dummyLast.next = this.dummyHead
    this.dummyLast.prev = this.dummyHead
  }

  put (key: number, value: number) {
    if (this.hashMap[key]) {

    }
  }

  get (key: number) {

  }
  // appendNode (node: LinkedDoubleList) {
  //   let oldHead = this.dummyHead.next
  //   this.dummyHead.next = node
  //   node.prev = this.dummyHead
  //   node.next = this.
  // }
}


const lru = new LRUCache(3)

console.log(lru)