import { combineReducers } from 'redux';
import AccountReducer from './account';
import InputvalueReducer from './SearchValue';
import ItemReducer from './Items';
import UserInfoReducer from './UserInfo';

const rootReducer = combineReducers({
  AccountReducer,
  InputvalueReducer,
  ItemReducer,
  UserInfoReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;