import { combineReducers } from 'redux';
import AccountReducer from './account';

const rootReducer = combineReducers({
  AccountReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;