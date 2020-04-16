import fetch from 'isomorphic-unfetch'
// Actions
// const LOAD = 'my-app/slabs/LOAD'
// const CREATE = 'my-app/items/CREATE';
// const UPDATE = 'my-app/items/UPDATE';
// const REMOVE = 'my-app/items/REMOVE';
const REQUEST = 'my-app/slabs/REQUEST'
const FAILURE = 'my-app/slabs/FAILURE'
const SUCCESS = 'my-app/slabs/SUCCESS'

const initialState = {
  isFetching: false,
  error: {},
  result: [],
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case REQUEST:
      return {
        ...state,
        isFetching: true,
        error: {},
      }
    case SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: {},
        result: action.payload.result,
      }
    case FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        result: [],
      }
    default:
      return state
  }
}

// Action Creators
export function request() {
  return { type: REQUEST }
}

export function success(payload) {
  return { type: SUCCESS, payload }
}

export function failure(payload) {
  return { type: FAILURE, payload }
}
// export function loadItems() {
//   return { type: LOAD }
// }

// export function createItem(item) {
//   return { type: CREATE, item };
// }

// export function updateItem(item) {
//   return { type: UPDATE, item };
// }

// export function removeItem(item) {
//   return { type: REMOVE, item };
// }

// // side effects, only as applicable
// // e.g. thunks, epics, etc
// export function getItem () {
//   return dispatch => get('/item').then(item => dispatch(updateItem(item)))
// }
export function getSlab() {
  return (dispatch, getState) => {
    dispatch(request())
    setTimeout(() => {
      fetch('api/food?q=cheese')
        .then((res) => {
          if (res.status >= 400) {
            throw new Error('Bad response from server')
          }
          return res.json()
        })
        .then((result) => {
          dispatch(success({ result }))
        })
        .catch((error) => {
          dispatch(failure({ error }))
        })
    }, 3000)
  }
}
