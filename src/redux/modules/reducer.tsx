import { combineReducers } from 'redux';
import AccountReducer from './account';
import InputvalueReducer from './SearchValue';
import ItemReducer from './Items';

const rootReducer = combineReducers({
  AccountReducer,
  InputvalueReducer,
  ItemReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;