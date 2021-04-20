import axios from 'axios';
import {UnformatedItem} from '../redux/modules/Items';
import {filteredItemParams, searchedItemParams} from '../interface/Item';

export const requestSearchItems = async (params: searchedItemParams, cb: (items: Array<UnformatedItem>) => void): Promise<void> => {
  axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/search`,
    params)
    .then(res => {
      cb(res.data.items);
    });
}; 

export const requestMyAuction = async (type: string, params: filteredItemParams, cb: (items: Array<UnformatedItem>) => void): Promise<void> => {
  axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/${type}`,
    params,
    {withCredentials: true})
    .then(res => {
      cb(res.data.items);
    });
}; 