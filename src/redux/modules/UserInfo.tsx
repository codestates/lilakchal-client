import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//State 정의
export interface userInfoState {
  id: number,
  name: string,
  city?: string
}

export const initialState: userInfoState = {
  id: 0,
  name: '',
  city: ''
};


//Action type 정의
const userInfo = 'ttmk/UserInfo/LOGIN'; //Action은 '앱이름/reducer이름/Acction_type' 형태여야 한다. changeInfoByLogin로 변수 이름 변경하고싶음
const changeInfoByGPS = 'ttmk/UserInfo/GPS';

//Action 생성자 정의 및 export
export const UserInfoHandler = createAction(userInfo)<userInfoState>();
export const LocationInfoHandler = createAction(changeInfoByGPS)<string>();

const actions = {UserInfoHandler, LocationInfoHandler};

export type UserInfoAction = ActionType<typeof actions>

const UserInfoReducer = createReducer<userInfoState, UserInfoAction>(initialState, {
  [userInfo]: (state, action) => {
    
    return Object.assign({}, state, {
      'id': action.payload.id,
      'name': action.payload.name,
      'city': state.city
    });
  },
  [changeInfoByGPS]: (state, action) => {
    // console.log(action.payload);
    return Object.assign({}, state, {
      'id': state.id,
      'name': state.name,
      'city': action.payload
    });
  }
});

export default UserInfoReducer;
