import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import dotenv from 'dotenv';
import { RootState } from '../../redux/modules/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getFormatedItems } from '../../modules/converters';
import { ItemHandler } from '../../redux/modules/Items';
// import { BsFilter } from 'react-icons/bs';
import { VscListFilter } from 'react-icons/vsc';
import './style/FilterBtn.scss';
import { TypeHandler } from '../../redux/modules/SearchType';

dotenv.config();

const FilterBtn: React.FC<RouteComponentProps> = ({history}) => {

  const userInfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id, city } = userInfoState;
  const typeState = useSelector((state: RootState) => state.SearchTypeReducer);
  const { searchType } = typeState;
  const dispatch = useDispatch();
  const filterTooltip = useRef<HTMLDivElement>(null);
  

  const handleFilterPopup = () => {
    const visibility = filterTooltip?.current?.style.visibility;

    if(filterTooltip.current !== null) {
      if (visibility === 'hidden') {
        filterTooltip.current.style.visibility = 'visible';
      } else {
        filterTooltip.current.style.visibility = 'hidden';
      }
    }
  };

  window.onpopstate = function(event: any) {
    if(searchType === 'buyer') {
      dispatch(TypeHandler('seller'));
    }
    else {
      dispatch(TypeHandler('buyer'));
    }
  };
  useEffect(() => {
    dispatch(TypeHandler('buyer'));
    return () => {
      window.onpopstate = null;
    };
  }, []);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/${searchType}`,
      { offset: 0, userId: id, city: city},
      {withCredentials: true})
      .then(res => {
        dispatch(ItemHandler(getFormatedItems(res.data.items)));
        console.log('filter_searchtype', res.data.items);
      });
  }, [searchType]);

  const handlefilter = (props: string) => {
    //1.setSearchType으로 서버에 요청 분기(요청할 때 필요한것:userId => 리덕스에 있음)
    //2.응답받아서 리덕스에 저장하기
    if(props === 'buyer') {
      axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/buyer`,
        { offset: 0, userId: id, city: city },
        {withCredentials: true})
        .then(res => {
          dispatch(ItemHandler(getFormatedItems(res.data.items)));
          console.log('filter_buyer', res.data.items);
          history.push('/ko/mypage/auction');
        });
    }
    else {
      axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/seller`,
        { offset: 0, userId: id, city: city },
        {withCredentials: true})
        .then(res => {
          dispatch(ItemHandler(getFormatedItems(res.data.items)));
          console.log('filter_seller', res.data.items);
          history.push('/ko/mypage/auction');
        });
    }
  };

  return (
    <div className='filter-container'>
      <VscListFilter xmlns="http://www.w3.org/2000/svg" className='filter-button' onClick={handleFilterPopup}/>
      <div className="filter-tooltip" ref={filterTooltip}>
        <div className='radio-button'>
          <div className="buyer">
            <label className="tooltip-container">
              <input name='radio' type="radio" value="buyer" onClick={()=>handlefilter('buyer')} onChange={() => dispatch(TypeHandler('buyer'))} checked={searchType === 'buyer' ? true : false} />
              <span className="checkmark"></span>
                    입찰
            </label>
          </div>
          <div className="seller">
            <label className="tooltip-container">
              <input name='radio' type="radio" value="seller" onClick={()=>handlefilter('seller')} onChange={() => dispatch(TypeHandler('seller'))} checked={searchType === 'seller' ? true : false} />
              <span className="checkmark"></span>
                    판매
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FilterBtn);
