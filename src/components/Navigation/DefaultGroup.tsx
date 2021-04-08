import React from 'react';
import SearchBar from './SearchBar';
import GoRegister from './GoRegister';
import LoginSection from './LoginSection';

interface props {
  setNowPage?: any,
}

const DefaultGroup:React.FC<props> = ({setNowPage }) => {

  //서치바, 물품등록 btn
  //서치바는 input, 물품등록은 버튼 =>  두개다 컴포넌트로 만들어야함
  return (
    <div className="defalut-container">
      <div className='searchbar-container'>
        <SearchBar/>
      </div>
      <div className='GoRegister-container'>
        <GoRegister/>
      </div>
      <div className='loginsection-container'>
        <LoginSection setNowPage={setNowPage}/>
      </div>
      
    </div>
  );
};

export default DefaultGroup;
