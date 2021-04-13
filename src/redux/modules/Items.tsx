import { createAction, ActionType, createReducer } from 'typesafe-actions';

export interface Item {
  id: number,
  title: string,
  price: number,
  photo: string,
  endTime: Date,
  description: string,
  winnerId: number,
  sellerId?: number,
  isClosed: boolean,
  city:string,
}

export interface UnformatedItem {
  id: number,
  title: string,
  price: number,
  photo: string,
  endTime: string,
  description: string,
  winnerId: number,
  sellerId?: number,
  isClosed: boolean,
  city:string,
}

//State 정의
export interface ItemsState {
  items: Array<Item>
}

export const initialState: ItemsState = {
  items: []
};

//Action type 정의
const ITEMS = 'ttmk/Item/ITEMS'; //Action은 '앱이름/reducer이름/Acction_type' 형태여야 한다.

//Action 생성자 정의 및 export
export const ItemHandler = createAction(ITEMS)<ItemsState>();

const actions = ItemHandler;

export type ItemAction = ActionType<typeof actions> //옥션이 아니라 액션이었습니다

const ItemReducer = createReducer<ItemsState, ItemAction>(initialState, {
  [ITEMS]: (state, action) => {
    return Object.assign({}, state, {
      'items': action.payload.items
    });
  }
});

//reducer는 export default로 export 한다.
export default ItemReducer;