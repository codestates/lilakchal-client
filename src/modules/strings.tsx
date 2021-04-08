export const getPlaceMessage = (place: string):string => {
  if(place) {
    return `찾았땅! ${place}에 있땅!`;
  } else {
    return '위치를 찾고있땅!';
  }
};

export const constantString = {
  sloganPart1: '우리동네 경매장',
  sloganPart2: '땅땅마켓',
  go: '시작하기',
  landing1: '좋은 물건을 구경하고 경매에 참여해보세요!',
  landing2: '내 위치 주변의 물건들을 확인해보세요',
  landing3: '경매의 주최자가 되어보세요',
  searchPlaceHolder: '검색: 기프티콘, 맥북...',
  noSearchResult: '검색 결과가 없어요!',
  bidSuccess: '최종입찰되었습니다!',
  bidFail: '아쉽지만 최종입찰에 실패하였습니다.',
  goChat: '채팅으로 거래하기',
  registeredItem: '등록한 경매',
  bidItem: '입찰한 경매',
  endBid: '입찰마감'
};