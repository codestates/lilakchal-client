import React from 'react';
//import './style/SearchBtn.scss';
// import { FaSearch } from 'react-icons/fa';
import { ImSearch } from 'react-icons/im';
interface props {
  
  handleSubmit: () => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SearchBtn = ({handleSubmit}: props) => {
  
  //1. 버튼을 눌렀을 때 searchBar에서 받은 props인 handleSubmit함수를 실행한다
  //2. Link로 만들어서 버튼의 이미지를 넣는다
  //3. 다 한다음에 feature 새로운거 파서 searchBar에서 실제로 함수 만들어서 props로 내려주기
  return (
    <div className='submit-button' onClick={()=>handleSubmit()}>
      <ImSearch className= 'searchbtn'/>
    </div>
  );
};

export default SearchBtn;
