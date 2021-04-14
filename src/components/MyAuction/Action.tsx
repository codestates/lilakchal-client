import React from 'react';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Container } from '../../pages/style/SearchPageStyle';
import { HeaderHandler } from '../../redux/modules/HeaderState';
import { Item } from '../../redux/modules/Items';
import ItemCard from '../ItemCard';
import Empty from '../../modules/Empty';
import './style/Auction.scss';



const Action: React.FC = () => {

  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;
  const dispatch = useDispatch();

  console.log(items);

  //페이지 뒤로가기, 앞으로 가기 할때 items바뀌도록 하기

  useEffect(() => {
    
    dispatch(HeaderHandler(false));
    console.log('앞으로 다시오면 mypage useeffect가 실행되나요?'); 
  }, []);

  return (
    <div className='itemCard'>
      <Container>
        {
          items.length ? (items.map((item: Item) => 
            <ItemCard item={item} key={item.id}></ItemCard>
          )) : <Empty/>
        }
      </Container>
    </div>
  );
};

export default Action;
