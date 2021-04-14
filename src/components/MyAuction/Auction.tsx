import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Container } from '../../pages/style/SearchPageStyle';
import { Item } from '../../redux/modules/Items';
import ItemCard from '../ItemCard';
import './style/Auction.scss';

export interface TitleInfo{
  title: string
}

const Action: React.FC<RouteComponentProps> = ({history}) => {

  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;
  const [title, setTitle] = useState<string>('판매');

  useEffect(() => {
    if(history.location.state) {
      const { title } = history.location.state as TitleInfo;
      console.log('useeffect실행될때 title=', title);
      setTitle(title);
    }
    else {
      console.log('처음 title=', title);
      setTitle('판매');
    }
  }, [items]);

  return (
    <div className='itemCard'>
      <div className='auction-title'>
        <div>{title}</div>
      </div>
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

export default withRouter(Action);
