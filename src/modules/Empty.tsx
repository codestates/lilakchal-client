import React from 'react';
import errImg from '../res/error.png';

const Empty: React.FC = () => {

  return (
    <>
      <div>검색 결과가 없어요.</div>
      <div>다른 검색어를 입력해주세요!</div>
      <img src={errImg} alt=""/>
    </>
  );
};

export default Empty;