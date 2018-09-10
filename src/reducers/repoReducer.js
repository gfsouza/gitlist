import { FETCH_REPO_SUCCESS, FETCH_REPO_ERROR } from '../actions/types'

export default function repoReducer(state = [], action) {
  switch (action.type) {
    case FETCH_REPO_SUCCESS:
      return Object.assign({}, state, { repos: action.repos });
    case FETCH_REPO_ERROR:
      return Object.assign({}, state, { message: action.message });
    default:
      return state;
  }
}
