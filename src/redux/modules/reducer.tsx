import { combineReducers } from 'redux';
import AccountReducer from './account';
import InputValueReducer from './SearchValue';
import ItemReducer from './Items';
import UserInfoReducer from './UserInfo';
import SearchTypeReducer from './SearchType';

const rootReducer = combineReducers({
  AccountReducer,
  InputValueReducer: InputValueReducer,
  ItemReducer,
  UserInfoReducer,
  SearchTypeReducer
});  

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;