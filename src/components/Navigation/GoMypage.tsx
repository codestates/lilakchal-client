import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {BsPeopleCircle} from 'react-icons/bs';
import './style/GoMypage.scss';


//1.버튼을 누르면 마이페이지로 라우팅
//2.마이페이지로 가는 동시에, html에 있는 검색 값 지우기
type SomeComponentProps = RouteComponentProps;



const GoMypage: React.FC<SomeComponentProps> = ({history}) => {
  const goMypage = () => {
    //1. html에 있는 검색 값 지우기
    const SearchValue = (document.getElementById('searchbar') as HTMLInputElement);
    SearchValue.value = '';
    history.push('/ko/mypage/auction');
  };

  return (
    <div className='mypage-btn'>
      <BsPeopleCircle className='gomypage'onClick={goMypage} />
    </div>
  );
};

export default withRouter(GoMypage);
