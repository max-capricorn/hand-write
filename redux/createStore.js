export default function createStore (initialState, reducer) {
  let state = initialState;
  let listeners = [];
  function subscribe (listener) {
    listeners.push(listener);
  }

  function getState () {
    return state;
  }

  function dispatch (action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener()
    }
  }
  dispatch({ type: Symbol() })
  return {
    subscribe,
    getState,
    dispatch,
  }
}