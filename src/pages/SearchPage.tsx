import * as React from 'react';
import ItemCard from '../components/ItemCard/index';
import {initialState} from '../redux/modules/Items';

const SearchPage:React.FC = () => {

  const handleBidStatus = (isClosed: boolean) : void => {
    console.log(isClosed);
  };

  return (
    <div>
      검색 페이지
      <ItemCard item={initialState.items[0]}></ItemCard>
    </div>
  );
};

export default SearchPage;
