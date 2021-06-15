import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//State 정의
export type SearchState = {
  SearchValue: string;
  
};

export const initialState: SearchState = {
  SearchValue: ''
};

//Action type 정의
const SEARCH = 'ttmk/Inputvalue/SEARCH'; //Action은 '앱이름/reducer이름/Action_type' 형태여야 한다.

//Action 생성자 정의 및 export
export const SearchInputHandler = createAction(SEARCH)<string>();

const actions = SearchInputHandler;

export type SearchAction = ActionType<typeof actions>

const InputValueReducer =  createReducer<SearchState, SearchAction>(initialState, {
  [SEARCH]: (state, action) => {
    return Object.assign({}, state, {
      'SearchValue': action.payload
    });
  }
});

//reducer는 export default로 export 한다.
export default InputValueReducer;