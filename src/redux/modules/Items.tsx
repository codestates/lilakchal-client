import { createAction, ActionType, createReducer } from 'typesafe-actions';

export type Item = {
  id: number,
  title: string,
  price: number,
  photo: string,
  endTime: Date,
  description: string,
  winnerId: number,
  isClosed: boolean,
  city:string
}

//State 정의
export type ItemsState = {
  items: Array<Item>;
};

export const initialState: ItemsState = {
  items: [
    {
      id: 1, 
      title: '나이키 바람막이', 
      price: 11000, 
      photo: 'error.png',
      endTime: new Date('2021-04-08 01:00:00'),
      description: '바람막이 급처합니다.',
      winnerId: 3,
      isClosed: false,
      city: '서울 성동구'
    },
    {
      id: 2, 
      title: '나이키 운동화', 
      price: 24000, 
      photo: 'nike.png',
      endTime: new Date('2021-04-10 04:11:11'),
      description: '운동화 급처합니다.',
      winnerId: 3,
      isClosed: false,
      city: '서울 동대문구'
    }
  ]
};

//Action type 정의
const ITEMS = 'ttmk/Item/ITEMS'; //Action은 '앱이름/reducer이름/Acction_type' 형태여야 한다.

//Action 생성자 정의 및 export
export const ItemHandler = createAction(ITEMS)<Array<string>>();

const actions = ItemHandler;

export type ItemAction = ActionType<typeof actions> //옥션이 아니라 액션이었습니다

const ItemReducer = createReducer<ItemsState, ItemAction>(initialState, {
  [ITEMS]: (state, action) => {
    return Object.assign({}, state, {
      'AllItems': action.payload
    });
  }
});

//reducer는 export default로 export 한다.
export default ItemReducer;