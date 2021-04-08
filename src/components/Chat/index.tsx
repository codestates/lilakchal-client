import React, {useEffect}from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface props{
  itemId: number
}

const Chat:React.FC<RouteComponentProps> = ({history}) => {
  useEffect(() => {
    const { itemId } = history.location.state as props;
    console.log(itemId); //history.location.state.itemId
  }, []);
  return (
    <div>
      Chatting!
    </div>
  );
};

export default withRouter(Chat);
