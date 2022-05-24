/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
  this.cache = new Map()
  this.capacity = capacity
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  const { cache } = this
  if(!cache.has(key)){
      return -1
  }
  const val = cache.get(key)
  cache.delete(key)
  cache.set(key, val)
  return val
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  const { cache, capacity } = this
  if(cache.has(key)){
      cache.delete(key)
  }
  if(cache.size === capacity){
      const it = cache.keys()
      cache.delete(it.next().value)
  }
  cache.set(key,value)
};

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/



/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
  this.capacity = capacity
  this.map = new Map()
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  if(!this.map.get(key)) return -1
  const value = this.map.get(key)
  this.map.delete(key)
  this.map.set(key, value)
  return value
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if(this.map.get(key)) this.map.delete(key)
  this.map.set(key, value)
  if(this.map.size > this.capacity) {
      const first = this.map.keys().next().value
      this.map.delete(first)
  }
};

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/