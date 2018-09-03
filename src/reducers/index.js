import { combineReducers } from 'redux';

import repos from './repoReducer';
import user from './userReducer';

const RepoUserReducer = combineReducers({
	repos,
	user
});

export default RepoUserReducer;