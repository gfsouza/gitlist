import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer'
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import repoReducer from './reducers/repoReducer';

const store = createStore(
  combineReducers({
    userReducer,
    repoReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
