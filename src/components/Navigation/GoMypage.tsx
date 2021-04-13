import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {BsPersonFill} from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { HeaderHandler } from '../../redux/modules/HeaderState';

//1.버튼을 누르면 마이페이지로 라우팅
//2.마이페이지로 가는 동시에, html에 있는 검색 값 지우기
type SomeComponentProps = RouteComponentProps;



const GoMypage: React.FC<SomeComponentProps> = ({history}) => {

  const dispatch = useDispatch();

  const goMypage = () => {
    //1. html에 있는 검색 값 지우기
    const SearchValue = (document.getElementById('searchbar') as HTMLInputElement);
    SearchValue.value = '';
    dispatch(HeaderHandler(false));
    history.push('/ko/mypage/auction');
  };

  return (
    <div className='mypage-btn'>
      <BsPersonFill size='40'onClick={goMypage} />
    </div>
  );
};

export default withRouter(GoMypage);
