import React from 'react';
import './style/SearchBtn.scss';

interface props {
  
  handleSubmit: () => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

const SearchBtn = ({handleSubmit}: props) => {
  
  //1. 버튼을 눌렀을 때 searchBar에서 받은 props인 handleSubmit함수를 실행한다
  //2. Link로 만들어서 버튼의 이미지를 넣는다
  //3. 다 한다음에 feature 새로운거 파서 searchBar에서 실제로 함수 만들어서 props로 내려주기
  return (
    <div className='header-search-btn'>
      <button className='submit-button' onClick={()=>handleSubmit()} >검색</button>
    </div>
  );
};

export default SearchBtn;
