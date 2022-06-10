import { combineReducers } from '../../index.js'
import counter from './counter.js'
import person from './person.js'
const reducer = combineReducers({
  counter,
  person
})

export default reducer