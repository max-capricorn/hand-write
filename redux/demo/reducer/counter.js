const initialState = {
  counter: {
    count: 0
  },
}
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'INCREASE':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREASE':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}