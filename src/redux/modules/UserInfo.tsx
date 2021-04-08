import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//State 정의
export interface userInfoState {
  id: number,
  kakaoId: string,
  name: string,
};

export const initialState: userInfoState = {
  id: 0,
  kakaoId: '',
  name: '',
};

//Action type 정의
const userInfo = 'ttmk/UserInfo/userInfo'; //Action은 '앱이름/reducer이름/Acction_type' 형태여야 한다.

//Action 생성자 정의 및 export
export const UserInfoHandler = createAction(userInfo)<userInfoState>();

const actions = UserInfoHandler;

export type UserInfoAction = ActionType<typeof actions>

const UserInfoReducer = createReducer<userInfoState, UserInfoAction>(initialState, {
  [userInfo]: (state, action) => {
    return Object.assign({}, state, {
      'id': action.payload.id,
      'kakaoId': action.payload.kakaoId,
      'name': action.payload.name
    });
  }
});

export default UserInfoReducer;
