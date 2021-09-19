import { combineReducers } from 'redux';

 import auth from './auth/reducer'; 
 import tweet from './tweet/reducer'

const reducers = combineReducers({
   auth, 
   tweet,
});

export default reducers;