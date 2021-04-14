import { combineReducers } from 'redux';
import AccountReducer from './account';
import InputvalueReducer from './SearchValue';
import ItemReducer from './Items';
import UserInfoReducer from './UserInfo';
import HeaderReducer from './HeaderState';
import SearchTypeReducer from './SearchType';

const rootReducer = combineReducers({
  AccountReducer,
  InputvalueReducer,
  ItemReducer,
  UserInfoReducer,
  HeaderReducer,
  SearchTypeReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;