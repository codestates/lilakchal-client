import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { bidData } from '../../interface/Bid';
import { auctionSocket } from '../../modules/socket';
import { Container } from '../../pages/style/SearchPageStyle';
import { Item, ItemHandler } from '../../redux/modules/Items';
import ItemCard from '../ItemCard';
import './style/Auction.scss';



const Auction: React.FC = () => {

  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;
  const dispatch = useDispatch();

  useEffect(() => {
    //3. socketio에 연결: 가격정보 수신 시 querySelector로 해당 부분의 가격을 변경한다.
    auctionSocket.on('bid', ({itemId, price, userId}: bidData) => {
      console.log('receive bid', price, userId, itemId);
      //const priceDiv = document.querySelector(`#itemcard-${itemId}`) as Node;
      //priceDiv.textContent = price.toString();
      const newItems = items.map((item: Item) => {
        if(item.id === itemId) {
          item.winnerId = userId;
          item.price = price;
        }
        return item;
      });
      dispatch(ItemHandler({items: newItems}));
    });
    return () => {
      auctionSocket.off('bid');
    };
  }, [items]);


  return (
    <div className='itemCard'>
      <Container>
        {
          items ? (items.map((item: Item) => 
            <ItemCard item={item} key={item.id}></ItemCard>
          )) : <></>
        }
      </Container>
    </div>
  );
};

export default Auction;
