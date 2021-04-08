import axios from 'axios';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SubmitBtn from '../SubmitBtn';

import './style/RegisterForm.scss';

const RegisterForm: React.FC<RouteComponentProps> = ({history}) => {

  const [photo, setImage] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [endtime, setEndtime] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const fileChange = (e: any): void => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async () => {
    // 유효성
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('filename', photo.name);
    formData.append('title', title);
    formData.append('price', String(price)); // 타입을 number로 지정했지만 사용처의 대부분이 string
    formData.append('endtime', endtime);
    formData.append('description', description);

    await axios.post('https://localhost:4000/auction/register', formData, {withCredentials: true});
    history.push('/ko/search');
  };

  const getEndtime = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const date = new Date();

    const getTime = () => {
      const YYMMDD = date.toLocaleDateString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});

      let hh: string | number = date.getHours();
      if(hh < 10) {
        hh = `0${hh}`;
      }

      let mm: string | number = date.getMinutes();
      if(mm < 10) {
        mm = `0${mm}`;
      }

      let ss: string | number = date.getSeconds();
      if(ss < 10) {
        ss = `0${ss}`;
      }

      return `${YYMMDD} ${hh}:${mm}:${ss}`;
    };

    if (e.currentTarget.value === '1d') {
      date.setDate(date.getDate() + 1);
      setEndtime(getTime());
    } else if (e.currentTarget.value === '3d') {
      date.setDate(date.getDate() + 3);
      setEndtime(getTime());
    } else if (e.currentTarget.value === '7d') {
      date.setDate(date.getDate() + 7);
      setEndtime(getTime());
    }
  };

  const str = '등록';

  return (
    <section className="register">
      <input className="register-photo"type="file" accept="image/jpeg, image/png" onChange={fileChange}/>
      {/* image */}
      <input className="register-title" type="text" onChange={e => setTitle(e.target.value)} placeholder="제목을 입력해주세요" />
      <input className="register-price" type="text" onChange={e => setPrice(Number(e.target.value))} placeholder="최소 가격을 입력해주세요"/>
      <div>
        <button className="register-period" value="1d" onClick={getEndtime} >1일</button>
        <button className="register-period" value="3d" onClick={getEndtime} >3일</button>
        <button className="register-period" value="7d" onClick={getEndtime} >7일</button>
      </div>
      <textarea className="register-description" onChange={e => setDescription(e.target.value)}></textarea>
      <SubmitBtn str={str} submitHandler={submitHandler}/>
    </section>
  );
};

export default withRouter(RegisterForm);