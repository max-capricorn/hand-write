### redux 核心原理

1. 可以将react看作输入为state， 输出为view的纯函数
2. 范畴论将世界抽象为对象和对象之间的联系，Redux将所有事件抽象为action
3. Container中含有value和map俩个属性, 而修改value的方法只有map, 在操作完value后将新值放回Container中.
```javascript
// 如何操作或修改value 由f给出
store -> container
currentState -> value
action -> f
currentRuducer -> map
middleware -> IO functor (解决异步操作的各种问题)
```
4. store是一个容器含有state和reducer
> reducer是一个纯函数， 它可以查看之前的状态执行一个action并且返回一个新的状态
这从store的创建语句 enhancer(createStore)(reducer, preloadedState)

- applyMiddleware.js
- bindActionCreator.js
- combineReducer.js
- compose.js
- createStore.js
- utils/warning.js



