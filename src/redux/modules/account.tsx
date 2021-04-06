import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//State 정의
export type loginState = {
  isLogin: boolean;
};

export const initialState: loginState = {
  isLogin: false
};

//Action type 정의
const LOGIN = 'ttmk/Account/LOGIN'; //Action은 '앱이름/reducer이름/Acction_type' 형태여야 한다.
const LOGOUT = 'ttmk/Account/LOGOUT';

//Action 생성자 정의 및 export
export const LoginHandler = createAction(LOGIN)<boolean>();
export const LogoutHandler = createAction(LOGOUT)<boolean>();

const actions = {LoginHandler, LogoutHandler};

export type LoginAction = ActionType<typeof actions>

const AccountReducer = createReducer<loginState, LoginAction>(initialState, {
  [LOGIN]: (state, action) => {
    return Object.assign({}, state, {
      'isLogin': action.payload
    });
  },
  [LOGOUT]: (state, action) => {
    return Object.assign({}, state, {
      'isLogin': action.payload
    });
  }
});

//reducer는 export default로 export 한다.
export default AccountReducer;