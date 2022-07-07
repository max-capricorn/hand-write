import { Action, Reducer, State } from "./createStore";


export type Reducers = {
  [key: string]: Reducer
}

export default function combineReducers (reducers: Reducers) {
  const reducersKey = Object.keys(reducers)
  return function combination (state: State = {}, action: Action) {
    const nextState = {}
    for (let i = 0; i < reducersKey.length; i++) {
      const key = reducersKey[i];
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}