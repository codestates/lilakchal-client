import axios from 'axios';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';

import SubmitBtn from '../Common/SubmitBtn';
import './style/RegisterForm.scss';

const RegisterForm: React.FC<RouteComponentProps> = ({history}) => {

  const userid = useSelector((state: RootState) => state.UserInfoReducer);
  const { id } = userid;

  const [photo, setImage] = useState<any>(null);
  const [imgbase64, setImgbase64] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [endtime, setEndtime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fileChange = (e: any): void => {

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgbase64(base64.toString());
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const submitHandler = async () => {
    if (!photo) {
      setErrorMessage('사진을 등록해 주세요!');
      return;
    } else if (price <= 0) {
      setErrorMessage('최소 가격을 1원 이상 가격을 정해주세요!');
      return;
    } else if (!/^[0-9]/g.test(String(price))) {
      setErrorMessage('최소 가격은 숫자만 입력 가능합니다!');
    }

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('UserId', String(id));
    formData.append('photo', photo.name);
    formData.append('title', title);
    formData.append('price', String(price));
    formData.append('endTime', endtime);
    formData.append('description', description);

    // eslint-disable-next-line prefer-const
    for (let key of formData.keys()) {
      console.log(key);
    }
    // eslint-disable-next-line prefer-const
    for (let value of formData.values()) {
      console.log(value);
    }

    await axios.post('https://localhost:4000/auction/register', formData, { headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true });
    history.push('/ko/search');
  };

  const getEndtime = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const date = new Date();

    const getTime = () => {
      const YYMMDD = date.toLocaleDateString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});

      type Union = string | number;

      let hh: Union = date.getHours();
      if(hh < 10) {
        hh = `0${hh}`;
      }

      let mm: Union = date.getMinutes();
      if(mm < 10) {
        mm = `0${mm}`;
      }

      let ss: Union = date.getSeconds();
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
      {imgbase64 ? <img className="register-photo" src={imgbase64} /> : <></>}
      <input className="register-file" type="file" accept="image/jpeg, image/png" onChange={fileChange}/>
      <input className="register-title" type="text" onChange={e => setTitle(e.target.value)} placeholder="제목을 입력해주세요" />
      <input className="register-price" type="text" onChange={e => setPrice(Number(e.target.value))} placeholder="최소 가격을 입력해주세요"/>
      <div>
        <button className="register-period" value="1d" onClick={getEndtime} >1일</button>
        <button className="register-period" value="3d" onClick={getEndtime} >3일</button>
        <button className="register-period" value="7d" onClick={getEndtime} >7일</button>
      </div>
      <textarea className="register-description" onChange={e => setDescription(e.target.value)}></textarea>
      {errorMessage ? <div className="register-error">{errorMessage}</div> : <></>}
      <SubmitBtn str={str} submitHandler={submitHandler}/>
    </section>
  );
};

export default withRouter(RegisterForm);