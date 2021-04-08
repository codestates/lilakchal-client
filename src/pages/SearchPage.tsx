import * as React from 'react';
import Timer from '../components/ItemCard/Timer';
import CurrentPrice from '../components/ItemCard/CurrentPrice';

const SearchPage:React.FC = () => {

  const handleBidStatus = (isClosed: boolean) : void => {
    console.log(isClosed);
  };

  return (
    <div>
      검색 페이지
      <Timer endtime={new Date('2021-04-07 20:27:00') }  handleBidStatus={handleBidStatus}></Timer>
      <CurrentPrice itemId={41} price={12000}></CurrentPrice>
    </div>
  );
};

export default SearchPage;
