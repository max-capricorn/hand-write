const initialState = {
  person: {
    name: 'ws',
    description: 'lsy'
  }
}
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'addPerson':
      return {
        ...state,
        name: 'wss',
        description: 'lsyy'
      }
    case 'removePerson':
      return {
        ...state,
        name: 'w',
        description: 'ls'
      }
    default:
      return state
  }
}