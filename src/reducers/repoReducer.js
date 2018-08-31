import { FETCH_REPO } from '../actions/types'

export default function repoReducer(state = [], action) {
  switch (action.type) {
    case FETCH_REPO:
      return Object.assign({}, state, {repo: action.repo});
    default:
      return state;
  }
}
