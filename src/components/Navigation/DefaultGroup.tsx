import React from 'react';
import SearchBar from './SearchBar';
import RegistBtn from './RegistBtn';
import LoginSection from './LoginSection';


const DefaultGroup:React.FC = () => {

  //서치바, 물품등록 btn
  //서치바는 input, 물품등록은 버튼 =>  두개다 컴포넌트로 만들어야함
  return (
    <div className="defalut-container">
      <div className='searchbar-container'>
        <SearchBar/>
      </div>
      <div className='registbtn-container'>
        <RegistBtn/>
      </div>
      <div className='loginsection-container'>
        <LoginSection/>
      </div>
      
    </div>
  );
};

export default DefaultGroup;