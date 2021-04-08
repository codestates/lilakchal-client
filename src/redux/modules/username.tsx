import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//State 정의
export type usernameState = {
  username: string
};

export const initialState: usernameState = {
  username: ''
};

//Action type 정의
const USERNAME = 'ttmk/Username/USERNAME'; //Action은 '앱이름/reducer이름/Acction_type' 형태여야 한다.

//Action 생성자 정의 및 export
export const UsernameHandler = createAction(USERNAME)<string>();

const actions = { UsernameHandler };

export type UsernameAction = ActionType<typeof actions>

const UsernameReducer = createReducer<usernameState, UsernameAction>(initialState, {
  [USERNAME]: (state, action) => {
    return Object.assign({}, state, {
      'username': action.payload
    });
  }
});

//reducer는 export default로 export 한다.
export default UsernameReducer;