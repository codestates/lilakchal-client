import axios from 'axios';
import {UnformatedItem} from '../redux/modules/Items';
import {itemParams} from '../interface/Item';


export const requestMyAuction = async (type: string, params: itemParams, cb: (items: Array<UnformatedItem>) => void): Promise<void> => {
  axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/${type}`,
    params,
    {withCredentials: true})
    .then(res => {
      cb(res.data.items);
    });
}; 