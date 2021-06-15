import React, { useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import dotenv from 'dotenv';
import { RootState } from '../../redux/modules/reducer';
import { useDispatch, useSelector } from 'react-redux';
import {requestMyAuction} from '../../modules/request';
import { getFormatedItems  } from '../../modules/converters';
import { ItemHandler, UnformatedItem } from '../../redux/modules/Items';
import { VscListFilter } from 'react-icons/vsc';
import './style/FilterBtn.scss';
import { TypeHandler } from '../../redux/modules/SearchType';
import LoadingModal from '../Modal/LoadingModal';
import { useState } from 'react';

dotenv.config();

const FilterBtn: React.FC<RouteComponentProps> = ({history}) => {
  const userInfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id, city } = userInfoState;
  const typeState = useSelector((state: RootState) => state.SearchTypeReducer);
  const { searchType } = typeState;
  const dispatch = useDispatch();
  const filterTooltip = useRef<HTMLDivElement>(null);
  const [isChanged, setIsChanged] = useState(false);

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

  window.onpopstate = function() {
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
      setIsChanged(false);
    };
  }, []);

  useEffect(() => {
    requestMyAuction(searchType, { offset: 0, userId: id, city: city }, requestHistoryItemCallback);
  }, [searchType]);

  const requestHistoryItemCallback = (items:Array<UnformatedItem>) => {
    dispatch(ItemHandler(getFormatedItems(items)));
    setIsChanged(true);
  };

  const requestFilteredItemCallback = (items:Array<UnformatedItem>) => {
    dispatch(ItemHandler(getFormatedItems(items)));
    history.push('/ko/mypage/auction');
  };

  const handlefilter = (props: string) => {
    requestMyAuction(props, { offset: 0, userId: id, city: city }, requestFilteredItemCallback);
  };

  return (
    <div className='filter-container'>
      <>
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
      </>
      <LoadingModal isLoading={!isChanged}/>
    </div>
  );
};

export default withRouter(FilterBtn);
