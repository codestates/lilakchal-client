import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//State 정의
export type HeaderState = {
  Default: boolean;
};

export const initialState: HeaderState = {
  Default: true
};

//Action type 정의
const Header = 'ttmk/Header/Header'; //Action은 '앱이름/reducer이름/Acction_type' 형태여야 한다.

//Action 생성자 정의 및 export
export const HeaderHandler = createAction(Header)<boolean>();

const actions = HeaderHandler;

export type HeaderAction = ActionType<typeof actions>

const HeaderReducer = createReducer<HeaderState, HeaderAction>(initialState, {
  [Header]: (state, action) => {
    return Object.assign({}, state, {
      'Default': action.payload
    });
  }
});

export default HeaderReducer;
