import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';  // Import redux-thunk
import { issuesReducer } from './issuesReducer';

const rootReducer = combineReducers({
  issues: issuesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));  // Apply redux-thunk middleware

export default store;