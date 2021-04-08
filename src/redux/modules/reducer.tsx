import { combineReducers } from 'redux';
import AccountReducer from './account';
import InputvalueReducer from './SearchValue';
import ItemReducer from './Items';
import UsernameReducer from './username';

const rootReducer = combineReducers({
  AccountReducer,
  InputvalueReducer,
  ItemReducer,
  UsernameReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;