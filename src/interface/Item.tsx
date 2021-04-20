export interface filteredItemParams {
  userId: number,
  city?: string,
  offset: number
}

export interface searchedItemParams {
  params: {
    keyword?: string,
    city?: string,
    offset: number
  }
}
