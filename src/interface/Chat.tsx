export interface itemInfo{
  itemId: number,
  title: string
}

export interface unFormatedMessage{
  userId: number,
  itemId: number,
  text: string,
  createdAt: string //Date 변환해서 사용
}

export interface message{
  userId: number,
  itemId: number,
  text: string,
  createdAt: Date //Date 변환해서 사용
}