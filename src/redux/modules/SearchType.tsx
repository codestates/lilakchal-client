import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//State 정의
export type TypeState = {
  searchType: string;
};

export const initialState: TypeState = {
  searchType: 'seller'
};

//Action type 정의
const Type = 'ttmk/Search/Type'; //Action은 '앱이름/reducer이름/Acction_type' 형태여야 한다.

//Action 생성자 정의 및 export
export const TypeHandler = createAction(Type)<string>();

const actions = TypeHandler;

export type TypeAction = ActionType<typeof actions>

const SearchTypeReducer = createReducer<TypeState, TypeAction>(initialState, {
  [Type]: (state, action) => {
    return Object.assign({}, state, {
      'searchType': action.payload
    });
  }
});

export default SearchTypeReducer;
