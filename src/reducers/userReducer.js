import { FETCH_USER_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_ERROR } from '../actions/types'

export default function userReducer(state = [], action) {
  debugger
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return Object.assign({}, state, { loading: true });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, { user: action.user, loading: false });
    case FETCH_USER_ERROR:
      return Object.assign({}, state, { message: action.message, loading: false });
    default:
      return state;
  }
}
