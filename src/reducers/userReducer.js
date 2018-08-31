import { FETCH_USER, FETCH_REPO } from '../actions/types'

export default function userReducer(state = [], action) {
  switch (action.type) {
    case FETCH_REPO:
      return Object.assign({}, state, {repo: action.repo});
    case FETCH_USER:
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  }
}
