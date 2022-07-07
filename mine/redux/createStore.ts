
export interface State {
  [key: string]: any
}

export type Reducer = (state: State, action: Action) => State


export interface Action {
  type: string | Symbol
  payload?: State
}

type Subscriber = () => void
export default function createStore (initialState: State, reducer: Reducer) {
  let state = initialState
  let listeners = []

  function getState () {
    return state
  }

  function subscribe (subscriber: Subscriber) {
    listeners.push(subscriber)
  }

  dispatch({ type: Symbol() })

  function dispatch (action: Action) {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener()
    }
  }

  return {
    getState,
    subscribe,
    dispatch,
  }


}