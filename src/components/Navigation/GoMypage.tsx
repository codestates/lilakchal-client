import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

//1.버튼을 누르면 마이페이지로 라우팅
//2.마이페이지로 가는 동시에, html에 있는 검색 값 지우기
type SomeComponentProps = RouteComponentProps;

interface props {
  setNowPage: any,
}

const GoMypage: React.FC<props & SomeComponentProps> = ({history, setNowPage}) => {

  const goMypage = () => {
    //1. html에 있는 검색 값 지우기
    const SearchValue = (document.getElementById('searchbar') as HTMLInputElement);
    SearchValue.value = '';
    history.push('/ko/mypage');
    setNowPage(false);
  };

  return (
    <div>
      <button className='mypage-btn' onClick={goMypage}>마이페이지</button>
    </div>
  );
};

export default withRouter(GoMypage);
