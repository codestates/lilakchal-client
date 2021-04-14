import { combineReducers } from 'redux';
import AccountReducer from './account';
import InputvalueReducer from './SearchValue';
import ItemReducer from './Items';
import UserInfoReducer from './UserInfo';
import HeaderReducer from './HeaderState'; //없애기!!

const rootReducer = combineReducers({
  AccountReducer,
  InputvalueReducer,
  ItemReducer,
  UserInfoReducer,
  HeaderReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;